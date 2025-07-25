import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast, IonSpinner } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { arrowBack, create, business, settings, notifications } from 'ionicons/icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast, IonSpinner, CommonModule, FormsModule]
})
export class UserProfilePage implements OnInit {
  currentUser: User | null = null;
  isEditMode: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  // Form fields for editing
  editName: string = '';
  editEmail: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Add icons
    addIcons({ arrowBack, create, business, settings, notifications });
    console.log('UserProfilePage constructor called');
  }

  ngOnInit() {
    console.log('UserProfilePage ngOnInit called');
    
    // Check if user is authenticated
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('Is authenticated:', isAuthenticated);
    
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user from AuthService:', this.currentUser);
    
    if (!this.currentUser || !isAuthenticated) {
      console.log('No user found or not authenticated, redirecting to login');
      // Redirect to login if no user is logged in
      this.router.navigate(['/login']);
      return;
    }

    console.log('User found, initializing edit fields');
    // Initialize edit fields
    this.editName = this.currentUser.name;
    this.editEmail = this.currentUser.email;
    
    // Force change detection
    setTimeout(() => {
      console.log('Forcing change detection');
      console.log('Current user after timeout:', this.currentUser);
      console.log('AuthService isAuthenticated:', this.authService.isAuthenticated());
      console.log('LocalStorage auth_token:', localStorage.getItem('auth_token'));
      console.log('LocalStorage current_user:', localStorage.getItem('current_user'));
    }, 100);
  }

  /**
   * Toggle edit mode
   */
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    
    if (this.isEditMode) {
      // Initialize edit fields when entering edit mode
      this.editName = this.currentUser?.name || '';
      this.editEmail = this.currentUser?.email || '';
    }
  }

  /**
   * Save profile changes
   */
  saveChanges() {
    if (!this.currentUser) return;

    // Validate form
    if (!this.editName.trim() || !this.editEmail.trim()) {
      this.showErrorToast('Name and email are required');
      return;
    }

    // Update user data (in a real app, this would be an API call)
    this.currentUser.name = this.editName.trim();
    this.currentUser.email = this.editEmail.trim();

    // Update in AuthService
    // Note: In a real app, you'd make an API call to update the user
    // For now, we'll just show a success message
    
    this.isEditMode = false;
    this.showSuccessToast('Profile updated successfully');
  }

  /**
   * Cancel edit mode
   */
  cancelEdit() {
    this.isEditMode = false;
    // Restore original values
    this.editName = this.currentUser?.name || '';
    this.editEmail = this.currentUser?.email || '';
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
   * Navigate back to home
   */
  goBack() {
    this.router.navigate(['/home']);
  }

  /**
   * Navigate to login
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to professional profile
   */
  goToProfessionalProfile() {
    if (this.currentUser?.professionalId) {
      this.router.navigate(['/professional', this.currentUser.professionalId]);
    }
  }

  /**
   * Show success toast
   */
  private showSuccessToast(message: string) {
    this.toastMessage = message;
    this.toastColor = 'success';
    this.showToast = true;
  }

  /**
   * Show error toast
   */
  private showErrorToast(message: string) {
    this.toastMessage = message;
    this.toastColor = 'danger';
    this.showToast = true;
  }

  /**
   * Handle toast dismiss
   */
  onToastDismiss() {
    this.showToast = false;
  }
} 