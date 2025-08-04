import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonTextarea, IonToast, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { AuthService } from '../../services/auth.service';
import { ProfessionalService } from '../../services/professional.service';
import { addIcons } from 'ionicons';
import { checkmarkCircle, checkmarkOutline, medkitOutline, locationOutline, timeOutline, callOutline, createOutline, addOutline, saveOutline, closeOutline } from 'ionicons/icons';
import { MapSelectorComponent } from '../../components/map-selector/map-selector.component';
import { Subscription } from 'rxjs';
import { RatingResponse } from '../../models/rating.model';
import { ServiceProfile } from '../../models/service-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    AppHeaderComponent,
    StarRatingComponent,
    MapSelectorComponent,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonToast,
    IonSpinner
  ]
})
export class ProfilePage implements OnInit, OnDestroy {
  // Properties
  service: ServiceProfile | null = null;
  isEditMode = false;
  isOwner = false;
  originalService: ServiceProfile | null = null;
  isLoading = false;
  error = '';
  
  // Rating properties
  userRating = 0;
  ratingSubmitted = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  // Subscriptions
  private professionalSub?: Subscription;
  private servicesSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private professionalService: ProfessionalService
  ) {
    addIcons({
      medkitOutline,
      locationOutline,
      timeOutline,
      callOutline,
      checkmarkOutline,
      checkmarkCircle,
      createOutline,
      addOutline,
      saveOutline,
      closeOutline
    });
  }

  ngOnInit(): void {
    const professionalId = this.route.snapshot.paramMap.get('id');
    if (!professionalId) {
      this.error = 'Professional ID not found';
      return;
    }

    this.loadProfessionalData(Number(professionalId));
    this.isOwner = this.checkIfOwner();
  }

  ngOnDestroy(): void {
    if (this.professionalSub) {
      this.professionalSub.unsubscribe();
    }
    if (this.servicesSub) {
      this.servicesSub.unsubscribe();
    }
  }

  checkIfOwner(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.type === 'provider';
  }

  loadProfessionalData(professionalId: number): void {
    this.isLoading = true;
    this.error = '';

    this.professionalSub = this.professionalService.getById(professionalId).subscribe({
      next: (professional: any) => {
        this.service = {
          id: professional.id.toString(),
          name: professional.businessName || `${professional.name} ${professional.surname}`,
          specialty: professional.category?.name || '',
          rating: 4.5,
          reviews: 0,
          description: professional.businessDescription || '',
          location: 'Location not available',
          hour: 'Hours not available',
          contact: professional.email,
          photos: professional.photos ? JSON.parse(professional.photos) as string[] : ['assets/images/default-profile.png'],
          mapUrl: 'https://www.google.com/maps/embed?pb=...',
          services: []
        };

        this.loadProfessionalServices(professionalId);
        this.originalService = { ...this.service };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading professional:', error);
        this.error = 'Failed to load professional information';
        this.isLoading = false;
      }
    });
  }

  loadProfessionalServices(professionalId: number): void {
    this.professionalService.getServices(professionalId).subscribe({
      next: (services: Array<{ name: string; category?: { name: string } }>) => {
        if (this.service) {
          this.service.services = services.map(service => ({
            name: service.name,
            category: service.category?.name || ''
          }));
        }
      },
      error: (error) => {
        console.error('Error loading services:', error);
      }
    });
  }

  onEditClick(): void {
    this.isEditMode = true;
  }

  onSaveClick(): void {
    if (!this.service) return;

    const professionalData = {
      businessName: this.service.name,
      businessDescription: this.service.description,
      photos: JSON.stringify(this.service.photos)
    };

    this.professionalService.update(Number(this.service.id), professionalData).subscribe({
      next: () => {
        this.showToast = true;
        this.toastMessage = 'Alterações salvas com sucesso!';
        this.toastColor = 'success';
        this.isEditMode = false;
        if (this.service) {
          this.originalService = {
            ...this.service,
            photos: [...this.service.photos],
            services: this.service.services.map(s => ({ ...s }))
          };
        }
      },
      error: (err: unknown) => {
        console.error('Error updating professional:', err);
        this.showToast = true;
        this.toastMessage = 'Erro ao salvar alterações';
        this.toastColor = 'danger';
      }
    });
  }

  onCancelClick(): void {
    if (this.originalService) {
      this.service = {
        ...this.originalService,
        photos: [...this.originalService.photos],
        services: this.originalService.services.map(s => ({ ...s }))
      };
    }
    this.isEditMode = false;
  }

  onRatingChange(rating: number): void {
    this.userRating = rating;
  }

  submitRating(): void {
    if (!this.service || this.userRating === 0) return;

    this.professionalService.addRating(Number(this.service.id), this.userRating).subscribe({
      next: (response: RatingResponse) => {
        if (this.service) {
          this.service.rating = response.newRating;
          this.service.reviews = response.totalReviews;
        }
        
        this.ratingSubmitted = true;
        this.showToast = true;
        this.toastMessage = 'Avaliação enviada com sucesso!';
        this.toastColor = 'success';
        
        setTimeout(() => {
          this.userRating = 0;
          this.ratingSubmitted = false;
        }, 3000);
      },
      error: (error: any) => {
        console.error('Error submitting rating:', error);
        this.showToast = true;
        this.toastMessage = error?.message || 'Erro ao enviar avaliação';
        this.toastColor = 'danger';
      }
    });
  }

  onToastDismiss(): void {
    this.showToast = false;
  }

  getStars(rating: number): boolean[] {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= roundedRating);
    }
    return stars;
  }
  
  onLocationSelected(event: { lat: number; lng: number }): void {
    if (this.service) {
      this.service.mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d${event.lng}!3d${event.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr`;
    }
  }

  addService(): void {
    if (this.service) {
      this.service.services.push({
        name: '',
        category: ''
      });
    }
  }

  removeService(index: number): void {
    if (this.service) {
      this.service.services.splice(index, 1);
    }
  }
}
