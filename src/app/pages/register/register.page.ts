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
  IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, businessOutline, globeOutline } from 'ionicons/icons';

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

  constructor() {
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
      const userData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        isProfessional: this.isProfessional,
        ...(this.isProfessional && {
          businessName: this.businessName,
          businessDescription: this.businessDescription,
          website: this.website
        })
      };
      
      console.log('Registration data:', userData);
      // TODO: Implement actual registration logic
      // this.authService.register(userData);
    }
  }
}
