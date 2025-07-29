import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonInputPasswordToggle, IonButton, IonImg, IonSpinner, IonToast, IonText } from '@ionic/angular/standalone';
import { AuthService, LoginResponse } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, IonText, IonToast, IonSpinner, IonImg, IonItem, IonContent, CommonModule, FormsModule, IonInput, IonInputPasswordToggle, IonButton]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  // Form validation states
  emailError: string = '';
  passwordError: string = '';
  isFormValid: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Clear any existing authentication on login page
    // This ensures user can always access login page
    this.authService.clearAuth();
    console.log('Login page loaded, auth cleared');
  }

  /**
   * Validate email field
   */
  validateEmail() {
    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }

    this.emailError = '';
    return true;
  }

  /**
   * Validate password field
   */
  validatePassword() {
    if (!this.password) {
      this.passwordError = 'Password is required';
      return false;
    }

    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long';
      return false;
    }

    this.passwordError = '';
    return true;
  }

  /**
   * Validate entire form
   */
  validateForm() {
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    this.isFormValid = isEmailValid && isPasswordValid;
    return this.isFormValid;
  }

  /**
   * Handle form input changes
   */
  onEmailChange() {
    if (this.emailError) {
      this.validateEmail();
    }
    this.clearError();
  }

  onPasswordChange() {
    if (this.passwordError) {
      this.validatePassword();
    }
    this.clearError();
  }

  /**
   * Clear general error message
   */
  private clearError() {
    this.errorMessage = '';
  }

  /**
   * Handle login submission
   */
  onLogin() {
    console.log('Login button clicked');
    console.log('Email:', this.email, 'Password:', this.password);
    
    if (!this.validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validated, starting login process');
    this.isLoading = true;
    this.clearError();

    
    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        console.log('Login response received:', response);
        this.isLoading = false;
        if (response.success) {
          console.log('Login successful, navigating to home');

          this.showSuccessToast('Login successful! Welcome back.');
          
          // Check if user is a professional and redirect accordingly
          if (response.user?.type === 'provider' && response.user?.professionalId) {
            // Redirect professional to their edit page
            this.router.navigate(['/professional', response.user.professionalId, 'edit']);
          } else {
            // Redirect client to home page
            this.router.navigate(['/home']);
          }
        } else {
          console.log('Login failed:', response.message);
          this.errorMessage = response.message;
          this.showErrorToast(response.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        this.errorMessage = 'An unexpected error occurred. Please try again.';
        this.showErrorToast(this.errorMessage);
      }
    });
  }

  /**
   * Navigate to register page
   */
  onRegister() {
    this.router.navigate(['/register']);
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
