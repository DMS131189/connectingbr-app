import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSearchbar, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { ServiceService } from '../../services/service.service';
import { CategoryService } from '../../services/category.service';
import { Service } from '../../models/service.model';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { personCircleOutline, star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    AppHeaderComponent,
    IonContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonSpinner,
    CommonModule,
    FormsModule
  ]
})
export class SearchPage implements OnInit, OnDestroy {
  searchQuery: string = '';
  categoryId?: number;
  categoryName: string = '';
  services: Service[] = [];
  filteredServices: Service[] = [];
  isLoading = false;
  error = '';

  private searchSubscription?: Subscription;
  private queryParamsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private categoryService: CategoryService
  ) {
    addIcons({ personCircleOutline, star, starOutline });
  }

  private loadCategory() {
    if (this.categoryId) {
      this.categoryService.getById(this.categoryId).subscribe({
        next: (category) => {
          this.categoryName = category.name;
        },
        error: (error) => {
          console.error('Erro ao carregar categoria:', error);
          this.categoryName = '';
        }
      });
    } else {
      this.categoryName = '';
    }
  }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.categoryId = params['category'] ? Number(params['category']) : undefined;
      this.loadCategory();
      this.loadServices();
    });
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
  }

  loadServices() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    
    this.isLoading = true;
    this.error = '';
    
    const searchParams: any = {};
    
    if (this.categoryId) {
      searchParams.categoryId = this.categoryId;
    }
    
    if (this.searchQuery && this.searchQuery.trim()) {
      searchParams.query = this.searchQuery.trim();
    }
    
    this.searchSubscription = this.serviceService
      .search(searchParams)
      .subscribe({
        next: (services) => {
          this.services = services;
          this.filteredServices = services;
          this.isLoading = false;
          if (services.length === 0) {
            this.error = 'Nenhum serviço encontrado para esta busca.';
          }
        },
        error: (error) => {
          console.error('Erro ao carregar serviços:', error);
          this.error = 'Não foi possível carregar os serviços. Por favor, tente novamente mais tarde.';
          this.isLoading = false;
          this.services = [];
          this.filteredServices = [];
        }
      });
  }

  onSearchChange(event: CustomEvent) {
    const query = event.detail.value?.toLowerCase() || '';
    this.searchQuery = query;
    
    // Atualizar a URL com o novo termo de busca
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        q: query || null,
        category: this.categoryId || null 
      },
      queryParamsHandling: 'merge'
    });

    this.loadServices();
  }

  getStars(rating: number): Array<boolean> {
    const rounded = Math.round(rating);
    return new Array(5).fill(false).map((_, i) => i < rounded);
  }

  goToProfile(service: Service): void {
    this.router.navigate(['/professional', service.professionalId]);
  }

  onCall(service: Service): void {
    // Implementar a lógica de chamada aqui
    console.log('Calling service:', service);
  }
}
