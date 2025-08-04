import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonSearchbar, IonSelect, IonSelectOption, IonSkeletonText } from '@ionic/angular/standalone';
import { ServiceService } from '../../services/service.service';
import { CategoryService } from '../../services/category.service';
import { Service } from '../../models/service.model';
import { Category } from '../../models/category.model';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  template: `
    <app-header></app-header>
    
    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Services</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Filtros -->
      <div class="filters-section">
        <ion-searchbar
          [(ngModel)]="searchQuery"
          (ionInput)="onSearch()"
          placeholder="Search services..."
        ></ion-searchbar>

        <ion-select
          [(ngModel)]="selectedCategoryId"
          (ionChange)="onCategoryChange()"
          placeholder="Select category"
        >
          <ion-select-option [value]="null">All Categories</ion-select-option>
          @for (category of categories; track category.id) {
            <ion-select-option [value]="category.id">{{ category.name }}</ion-select-option>
          }
        </ion-select>
      </div>

      <!-- Mensagem de erro -->
      @if (error) {
        <div class="error-message">
          {{ error }}
        </div>
      }

      <!-- Loading state -->
      @if (isLoading) {
        <ion-list>
          @for (item of [1,2,3,4,5]; track item) {
            <ion-item>
              <ion-label>
                <h2><ion-skeleton-text [animated]="true" style="width: 50%"></ion-skeleton-text></h2>
                <p><ion-skeleton-text [animated]="true" style="width: 70%"></ion-skeleton-text></p>
              </ion-label>
            </ion-item>
          }
        </ion-list>
      }

      <!-- Lista de serviços -->
      @if (!isLoading && services.length > 0) {
        <ion-list>
          @for (service of services; track service.id) {
            <ion-item button detail>
              <ion-label>
                <h2>{{ service.name }}</h2>
                <p>{{ service.description }}</p>
                <p>
                  <strong>Provider:</strong> {{ service.provider }} |
                  <strong>Price:</strong> {{ service.price }} |
                  <strong>Rating:</strong> {{ service.rating }}/5
                </p>
              </ion-label>
            </ion-item>
          }
        </ion-list>
      }

      <!-- Estado vazio -->
      @if (!isLoading && services.length === 0 && !error) {
        <div class="no-services">
          <p>No services found matching your criteria.</p>
        </div>
      }
    </ion-content>
  `,
  styles: [`
    .filters-section {
      padding: 1rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .error-message {
      background-color: #fef2f2;
      border: 1px solid #fee2e2;
      color: #dc2626;
      padding: 1rem;
      margin: 1rem;
      border-radius: 0.5rem;
      text-align: center;
    }

    .no-services {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    ion-select {
      margin-top: 0.5rem;
      --padding-start: 0;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppHeaderComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSkeletonText
  ]
})
export class ServicesPage implements OnInit, OnDestroy {
  services: Service[] = [];
  categories: Category[] = [];
  error = '';
  isLoading = false;
  searchQuery = '';
  selectedCategoryId: number | null = null;

  private servicesSub?: Subscription;
  private categoriesSub?: Subscription;
  private queryParamsSub?: Subscription;

  constructor(
    private serviceService: ServiceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Carregar categorias
    this.loadCategories();

    // Observar parâmetros da URL
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategoryId = Number(params['category']);
      }
      if (params['q']) {
        this.searchQuery = params['q'];
      }
      this.loadServices();
    });
  }

  ngOnDestroy() {
    this.servicesSub?.unsubscribe();
    this.categoriesSub?.unsubscribe();
    this.queryParamsSub?.unsubscribe();
  }

  loadCategories() {
    this.categoriesSub = this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Failed to load categories. Some filters may not be available.';
      }
    });
  }

  loadServices() {
    this.isLoading = true;
    this.error = '';

    this.servicesSub = this.serviceService.search({
      categoryId: this.selectedCategoryId || undefined,
      query: this.searchQuery || undefined
    }).subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.error = 'Failed to load services. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    this.loadServices();
  }

  onCategoryChange() {
    this.loadServices();
  }
}
