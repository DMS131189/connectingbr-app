import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonCard, 
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToggle,
  IonText,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, businessOutline, globeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonCard, 
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonToggle,
    IonText,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonSpinner,
    CommonModule, 
    FormsModule
  ]
})
export class RegisterPage implements OnInit {
  
  // User registration fields
  name: string = '';
  surname: string = '';
  email: string = '';
  confirmEmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  // Professional fields
  isProfessional: boolean = false;
  businessName: string = '';
  businessDescription: string = '';
  website: string = '';
  
  // Form validation
  emailError: string = '';
  passwordError: string = '';
  formError: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ personOutline, businessOutline, globeOutline });
  }

  ngOnInit() {
  }

  // Toggle professional mode
  toggleProfessional() {
    this.isProfessional = !this.isProfessional;
    if (!this.isProfessional) {
      // Clear professional fields when toggling off
      this.businessName = '';
      this.businessDescription = '';
      this.website = '';
    }
  }

  // Validate email confirmation
  validateEmail() {
    if (this.email && this.confirmEmail) {
      if (this.email !== this.confirmEmail) {
        this.emailError = 'Emails do not match';
        return false;
      } else {
        this.emailError = '';
        return true;
      }
    }
    return true;
  }

  // Validate password confirmation
  validatePassword() {
    if (this.password && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.passwordError = 'Passwords do not match';
        return false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters';
        return false;
      } else {
        this.passwordError = '';
        return true;
      }
    }
    return true;
  }

  // Validate form
  validateForm(): boolean {
    this.formError = '';
    
    if (!this.name || !this.surname || !this.email || !this.confirmEmail || !this.password || !this.confirmPassword) {
      this.formError = 'Please fill in all required fields';
      return false;
    }

    if (!this.validateEmail()) {
      return false;
    }

    if (!this.validatePassword()) {
      return false;
    }

    if (this.isProfessional) {
      if (!this.businessName || !this.businessDescription) {
        this.formError = 'Please fill in all professional fields';
        return false;
      }
    }

    return true;
  }

  // Handle form submission
  onSubmit() {
    if (this.validateForm()) {
      this.isLoading = true;
      
      const fullName = `${this.name} ${this.surname}`;
      const userType = this.isProfessional ? 'provider' : 'client';
      
      this.authService.register(this.email, this.password, fullName, userType).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          if (response.success && response.user) {
            console.log('Registration successful:', response);
            
            // Check if user is a professional and redirect accordingly
            if (response.user.type === 'provider' && response.user.professionalId) {
              // Redirect professional to their edit page
              this.router.navigate(['/professional', response.user.professionalId, 'edit']);
            } else {
              // Redirect client to home page
              this.router.navigate(['/home']);
            }
          } else {
            this.formError = response.message || 'Registration failed';
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Registration error:', error);
          this.formError = 'An unexpected error occurred. Please try again.';
        }
      });
    }
  }
}
