import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ConnectingBrService, User, Category, Review, LoginRequest } from "../../services/connecting-br.service";

@Component({
  selector: "app-backend-test",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> ConnectingBR - Backend Integration Test</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="container">
        <!-- Authentication Section -->
        <ion-card>
          <ion-card-header>
            <ion-card-title> Authentication</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div *ngIf="!isAuthenticated">
              <ion-item>
                <ion-label position="stacked">Email</ion-label>
                <ion-input [(ngModel)]="loginData.email" type="email" placeholder="Enter email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input [(ngModel)]="loginData.password" type="password" placeholder="Enter password"></ion-input>
              </ion-item>
              <ion-button expand="block" (click)="onLogin()" [disabled]="isLoading">Login</ion-button>
            </div>
            
            <div *ngIf="isAuthenticated">
              <ion-text color="success">
                <p>Welcome, {{ currentUser?.name }}!</p>
              </ion-text>
              <ion-button expand="block" (click)="onLogout()" color="danger">Logout</ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Categories Section -->
        <ion-card>
          <ion-card-header>
            <ion-card-title> Categories</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="block" (click)="loadCategories()" [disabled]="isLoading">Load Categories</ion-button>
            
            <div *ngIf="categories.length > 0">
              <ion-list>
                <ion-item *ngFor="let category of categories">
                  <ion-label>
                    <h2>{{ category.icon }} {{ category.name }}</h2>
                    <p>{{ category.description }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Professionals Section -->
        <ion-card>
          <ion-card-header>
            <ion-card-title> Professionals</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Search</ion-label>
              <ion-input [(ngModel)]="searchQuery" placeholder="Search professionals..." (ionInput)="onSearch()"></ion-input>
            </ion-item>
            <ion-button expand="block" (click)="loadProfessionals()" [disabled]="isLoading">Load All Professionals</ion-button>
            
            <div *ngIf="professionals.length > 0">
              <ion-list>
                <ion-item *ngFor="let professional of professionals">
                  <ion-label>
                    <h2>{{ professional.name }} {{ professional.surname }}</h2>
                    <p *ngIf="professional.businessName"><strong>{{ professional.businessName }}</strong></p>
                    <p *ngIf="professional.businessDescription">{{ professional.businessDescription }}</p>
                    <p *ngIf="professional.category">Category: {{ professional.category.name }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Reviews Section -->
        <ion-card>
          <ion-card-header>
            <ion-card-title> Reviews</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button expand="block" (click)="loadReviews()" [disabled]="isLoading">Load Reviews</ion-button>
            
            <div *ngIf="reviews.length > 0">
              <ion-list>
                <ion-item *ngFor="let review of reviews">
                  <ion-label>
                    <div class="rating">
                      <span *ngFor="let star of [1,2,3,4,5]">
                        {{ star <= review.rating ? "" : "" }}
                      </span>
                    </div>
                    <p>{{ review.comment }}</p>
                    <small>By: {{ review.reviewer?.name }} {{ review.reviewer?.surname }}</small>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Status Messages -->
        <ion-toast
          [isOpen]="!!message"
          [message]="message"
          [duration]="5000"
          (didDismiss)="clearMessage()"
          [color]="messageType">
        </ion-toast>
      </div>
    </ion-content>
  `,
  styles: [`
    .container {
      padding: 16px;
    }
    
    .rating {
      margin: 5px 0;
    }
  `]
})
export class BackendTestComponent implements OnInit {
  // Authentication
  isAuthenticated = false;
  currentUser: User | null = null;
  loginData: LoginRequest = { email: "", password: "" };

  // Data
  categories: Category[] = [];
  professionals: User[] = [];
  reviews: Review[] = [];
  searchQuery = "";

  // UI
  message = "";
  messageType = "primary";
  isLoading = false;

  constructor(private connectingBrService: ConnectingBrService) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.testConnection();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.connectingBrService.isAuthenticated();
    this.currentUser = this.connectingBrService.getCurrentUser();
  }

  testConnection(): void {
    this.isLoading = true;
    this.connectingBrService.testConnection().subscribe({
      next: (result) => {
        this.showMessage(` Connected to backend! ${result.categories} categories available.`, "success");
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(` Connection failed: ${error.message}`, "danger");
        this.isLoading = false;
      }
    });
  }

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.showMessage("Please enter email and password", "warning");
      return;
    }

    this.isLoading = true;
    this.connectingBrService.login(this.loginData).subscribe({
      next: (response) => {
        this.isAuthenticated = true;
        this.currentUser = response.user;
        this.showMessage(` Login successful! Welcome, ${response.user.name}!`, "success");
        this.loginData = { email: "", password: "" };
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(` Login failed: ${error.message}`, "danger");
        this.isLoading = false;
      }
    });
  }

  onLogout(): void {
    this.isLoading = true;
    this.connectingBrService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.showMessage(" Logout successful!", "success");
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(` Logout failed: ${error.message}`, "danger");
        this.connectingBrService.clearAuth();
        this.isAuthenticated = false;
        this.currentUser = null;
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    this.connectingBrService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.showMessage(` Loaded ${categories.length} categories!`, "success");
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(` Failed to load categories: ${error.message}`, "danger");
        this.isLoading = false;
      }
    });
  }

  loadProfessionals(): void {
    this.isLoading = true;
    this.connectingBrService.getProfessionals().subscribe({
      next: (professionals) => {
        this.professionals = professionals;
        this.showMessage(` Loaded ${professionals.length} professionals!`, "success");
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(` Failed to load professionals: ${error.message}`, "danger");
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.connectingBrService.searchProfessionals(this.searchQuery).subscribe({
        next: (professionals) => {
          this.professionals = professionals;
          this.showMessage(` Found ${professionals.length} professionals for "${this.searchQuery}"!`, "success");
          this.isLoading = false;
        },
        error: (error) => {
          this.showMessage(` Search failed: ${error.message}`, "danger");
          this.isLoading = false;
        }
      });
    }
  }

  loadReviews(): void {
    this.isLoading = true;
    this.connectingBrService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.showMessage(` Loaded ${reviews.length} reviews!`, "success");
        this.isLoading = false;
      },
      error: (error) => {
        this.showMessage(` Failed to load reviews: ${error.message}`, "danger");
        this.isLoading = false;
      }
    });
  }

  clearMessage(): void {
    this.message = "";
  }

  private showMessage(message: string, type: "success" | "danger" | "warning" | "primary" = "primary"): void {
    this.message = message;
    this.messageType = type;
  }
}
