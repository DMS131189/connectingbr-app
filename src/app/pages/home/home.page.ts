import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonToast, IonIcon, IonActionSheet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { business, person, chevronDown, logOut, settings, personCircle, personAdd } from 'ionicons/icons';
import { Subscription } from 'rxjs';

export interface Category {
  name: string;
  value: string;
  image: string;
  description: string;
  color: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  provider: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonActionSheet, IonIcon, IonToast, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class HomePage implements OnInit, OnDestroy {
  private userSubscription: Subscription = new Subscription();
  
  categories: Category[] = [
    {
      name: 'Health',
      value: 'health',
      image: 'assets/images/helth.png',
      description: 'Medical and wellness services',
      color: '#20B2AA'
    },
    {
      name: 'Beauty',
      value: 'beauty',
      image: 'assets/images/beauty.png',
      description: 'Beauty and aesthetic services',
      color: '#FF69B4'
    },
    {
      name: 'Services',
      value: 'services',
      image: 'assets/images/services.png',
      description: 'General and professional services',
      color: '#4169E1'
    },
    {
      name: 'Others',
      value: 'others',
      image: 'assets/images/others.png',
      description: 'Other specialized services',
      color: '#6A5ACD'
    }
  ];

  recentServices: Service[] = [
    {
      id: '1',
      name: 'Hair Styling',
      category: 'Beauty',
      description: 'Professional hair cutting and styling services',
      price: '€ 8-15',
      rating: 4.8,
      provider: 'Salon Maria'
    },
    {
      id: '2',
      name: 'Nutritionist Consultation',
      category: 'Health',
      description: 'Personalized nutrition plans and health assessment',
      price: '€ 20-35',
      rating: 4.9,
      provider: 'Dr. Ana Santos'
    },
    {
      id: '3',
      name: 'Home Cleaning',
      category: 'Services',
      description: 'Complete residential cleaning service',
      price: '€ 13-25',
      rating: 4.7,
      provider: 'Clean Home'
    }
  ];

  showToast: boolean = false;
  toastMessage: string = '';
  currentUser: User | null = null;
  showUserMenu: boolean = false;

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

  constructor(private router: Router, private authService: AuthService) {
    // Add icons
    addIcons({ business, person, chevronDown, logOut, settings, personCircle, personAdd });
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
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onCategoryClick(category: Category) {
    console.log('Category clicked:', category);
    // Redireciona para a página de busca filtrando pela categoria
    this.router.navigate(['/search'], {
      queryParams: { category: category.value }
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
}
