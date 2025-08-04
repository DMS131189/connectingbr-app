import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToast, IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceService } from 'src/app/services/service.service';
import { Category } from 'src/app/models/category.model';
import { addIcons } from 'ionicons';
import { business, person, chevronDown, logOut, settings, personCircle, personAdd, gridOutline } from 'ionicons/icons';
import { Subscription } from 'rxjs';

import { Service as BackendService } from '../../models/service.model';

export interface Service extends Omit<BackendService, 'category'> {
  category: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonActionSheet, IonIcon, IonToast, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
  providers: [CategoryService]
})
export class HomePage implements OnInit, OnDestroy {
  private userSubscription: Subscription = new Subscription();
  private categorySubscription: Subscription = new Subscription();
  
  categories: Category[] = [];
  error: string = '';
  showToast = false;
  toastMessage = '';
  showUserMenu = false;
  currentUser: User | null = null;

  recentServices: Service[] = [];
  isLoadingServices = false;

  userMenuButtons = [
    {
      text: 'Profile',
      icon: 'person-circle',
      handler: () => {
        this.goToProfile();
      }
    },
    {
      text: 'Settings',
      icon: 'settings',
      handler: () => {
        this.goToSettings();
      }
    },
    {
      text: 'Logout',
      icon: 'log-out',
      role: 'destructive',
      handler: () => {
        this.onLogout();
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];

  private serviceSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService,
    private serviceService: ServiceService
  ) {
    // Add icons
    addIcons({business,chevronDown,personAdd,person,gridOutline,logOut,settings,personCircle});
  }

  ngOnInit() {
    // Subscribe to user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('Current user updated:', this.currentUser);
    });
    
    // Also get initial user state
    this.currentUser = this.authService.getCurrentUser();
    console.log('Initial current user:', this.currentUser);

    // Load categories and recent services
    this.loadCategories();
    this.loadRecentServices();
  }

  loadRecentServices() {
    this.isLoadingServices = true;
    this.serviceSubscription = this.serviceService.getAll().subscribe({
      next: (services) => {
        this.recentServices = services.slice(0, 6).map(service => ({
          ...service,
          category: service.category.name
        }));
        this.isLoadingServices = false;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
        this.error = 'Não foi possível carregar os serviços recentes.';
        this.isLoadingServices = false;
      }
    });
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  loadCategories() {
    this.categorySubscription = this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Failed to load categories. Please try again later.';
      }
    });
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onCategoryClick(category: Category) {
    console.log('Category clicked:', category);
    // Redireciona para a página de serviços filtrando pela categoria
    this.router.navigate(['/services'], {
      queryParams: { category: category.id }
    });
  }

  onServiceClick(service: Service) {
    this.router.navigate(['/professional', service.id]);
  }

  onRatingClick(event: Event, service: Service) {
    // Prevent event bubbling to avoid triggering onServiceClick
    event.stopPropagation();
    
    // Navigate to the professional profile
    this.router.navigate(['/professional', service.id]);
  }

  onToastDismiss() {
    this.showToast = false;
  }

  onSearch(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    console.log('Search query:', query);
    
    if (query.length > 2) {
      // Navigate to search page with query
      this.router.navigate(['/search'], { 
        queryParams: { q: query } 
      });
    }
  }

  /**
   * Get user initials for avatar
   */
  getUserInitials(): string {
    if (!this.currentUser?.name) return '?';
    
    const names = this.currentUser.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }

  /**
   * Open user menu action sheet
   */
  openUserMenu() {
    this.showUserMenu = true;
  }

  /**
   * Navigate to profile page
   */
  goToProfile() {
    this.router.navigate(['/user-profile']);
    this.showUserMenu = false;
  }

  /**
   * Navigate to settings (placeholder)
   */
  goToSettings() {
    this.toastMessage = 'Settings page coming soon!';
    this.showToast = true;
    this.showUserMenu = false;
  }

  /**
   * Handle user logout
   */
  onLogout() {
    this.authService.logout();
    // currentUser will be updated automatically via subscription
    this.toastMessage = 'You have been logged out successfully';
    this.showToast = true;
    this.showUserMenu = false;
    
    // Redirect to login after short delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  /**
   * Handle user menu dismiss
   */
  onUserMenuDismiss() {
    this.showUserMenu = false;
  }

  onFeedback() {
    window.open('https://docs.google.com/forms/d/1-Ypj3SAlt34EL0RS_2I9pIKVitCsgQc4vX0Ln6vQ2TQ/edit', '_blank');
  }
}
