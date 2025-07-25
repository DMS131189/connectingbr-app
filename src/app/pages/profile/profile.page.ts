import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonTextarea, IonToast } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { checkmarkCircle, checkmarkOutline } from 'ionicons/icons';

interface ServiceProfile {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  hour: string;
  contact: string;
  photos: string[];
  mapUrl: string;
  services: { name: string; category: string; }[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, StarRatingComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonTextarea, IonToast, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  service: ServiceProfile | null = null;
  isEditMode: boolean = false;
  isOwner: boolean = false;
  originalService: ServiceProfile | null = null; // To store original data for cancel
  
  // Rating properties
  userRating: number = 0;
  ratingSubmitted: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({ checkmarkCircle, checkmarkOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.router.url;
    
    // Detect if we're in edit mode
    this.isEditMode = url.includes('/edit');
    
    // Check if current user is the owner using AuthService
    this.isOwner = this.isEditMode || this.checkIfOwner(id);
    
    this.loadService(id);
  }

  checkIfOwner(serviceId: string | null): boolean {
    if (!serviceId) return false;
    
    // Use AuthService to check if current user owns this professional profile
    const currentUser = this.authService.getCurrentUser();
    const userProfessionalId = this.authService.getProfessionalId();
    
    return currentUser?.type === 'provider' && userProfessionalId === serviceId;
  }

  loadService(id: string | null) {
    // Mock de dados
    const mock: ServiceProfile[] = [
      // Health Services
      {
        id: '1',
        name: 'Dr. Ana Souza',
        specialty: 'Pediatrician',
        rating: 4.5,
        reviews: 52,
        description: 'Lorem ipsum dolor sit amet consee talero descarigakeli. Eulecagciolod: Lilitro conprict aime lakeen et iurpm true suelte vigenre, rainersone.',
        location: 'Ventoranom Dutin',
        hour: '3:00 PM - 3:70 PM',
        contact: '+55 11 99999-9999',
        photos: ['assets/images/helth.png', 'assets/images/beauty.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Service A', category: 'Category 1' },
          { name: 'Service B', category: 'Category 2' }
        ]
      },
      {
        id: '2',
        name: 'Dr. Luis',
        specialty: 'Cardiologist',
        rating: 4.8,
        reviews: 40,
        description: 'Experienced cardiologist with 15 years in practice.',
        location: 'Av. Paulista, 1000',
        hour: '9:00 AM - 5:00 PM',
        contact: '+55 11 98888-8888',
        photos: ['assets/images/helth.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Service X', category: 'Category 3' }
        ]
      },
      {
        id: '3',
        name: 'Dr. Refivel Costa',
        specialty: 'Neurologist',
        rating: 5.0,
        reviews: 163,
        description: 'Specialist in neurological disorders with 30 years of experience.',
        location: 'Rua Augusta, 500',
        hour: '8:00 AM - 6:00 PM',
        contact: '+55 11 97777-7777',
        photos: ['assets/images/helth.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Neurological Consultation', category: 'Neurology' }
        ]
      },
      {
        id: '4',
        name: 'Dr. Luis Silva',
        specialty: 'Cardiologist',
        rating: 4.8,
        reviews: 45,
        description: 'Cardiologist specialist with focus on preventive care.',
        location: 'Av. Brigadeiro Faria Lima, 2000',
        hour: '10:00 AM - 4:00 PM',
        contact: '+55 11 96666-6666',
        photos: ['assets/images/helth.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Cardiac Consultation', category: 'Cardiology' }
        ]
      },
      // Beauty Services
      {
        id: '5',
        name: 'Salon Maria',
        specialty: 'Hair Stylist',
        rating: 4.8,
        reviews: 50,
        description: 'Professional hair cutting and styling services with 10 years experience.',
        location: 'Rua Oscar Freire, 300',
        hour: '9:00 AM - 7:00 PM',
        contact: '+55 11 95555-5555',
        photos: ['assets/images/beauty.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Hair Cut', category: 'Hair Styling' },
          { name: 'Hair Coloring', category: 'Hair Styling' }
        ]
      },
      {
        id: '6',
        name: 'Beauty Studio Ana',
        specialty: 'Makeup Artist',
        rating: 4.6,
        reviews: 35,
        description: 'Professional makeup and beauty treatments for all occasions.',
        location: 'Av. Higienópolis, 800',
        hour: '10:00 AM - 8:00 PM',
        contact: '+55 11 94444-4444',
        photos: ['assets/images/beauty.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Wedding Makeup', category: 'Makeup' },
          { name: 'Party Makeup', category: 'Makeup' }
        ]
      },
      {
        id: '7',
        name: 'Nail Art Studio',
        specialty: 'Nail Technician',
        rating: 4.9,
        reviews: 28,
        description: 'Professional nail care and artistic nail design.',
        location: 'Rua Pamplona, 400',
        hour: '9:00 AM - 6:00 PM',
        contact: '+55 11 93333-3333',
        photos: ['assets/images/beauty.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Manicure', category: 'Nail Care' },
          { name: 'Pedicure', category: 'Nail Care' }
        ]
      },
      {
        id: '8',
        name: 'Spa Relax',
        specialty: 'Massage Therapist',
        rating: 4.7,
        reviews: 42,
        description: 'Relaxing massage and spa treatments for wellness.',
        location: 'Av. Morumbi, 600',
        hour: '8:00 AM - 8:00 PM',
        contact: '+55 11 92222-2222',
        photos: ['assets/images/beauty.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Swedish Massage', category: 'Massage' },
          { name: 'Deep Tissue', category: 'Massage' }
        ]
      },
      // Services
      {
        id: '9',
        name: 'Clean Home',
        specialty: 'Cleaning Service',
        rating: 4.7,
        reviews: 40,
        description: 'Complete residential and commercial cleaning services.',
        location: 'Various locations',
        hour: '7:00 AM - 6:00 PM',
        contact: '+55 11 91111-1111',
        photos: ['assets/images/services.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'House Cleaning', category: 'Cleaning' },
          { name: 'Office Cleaning', category: 'Cleaning' }
        ]
      },
      {
        id: '10',
        name: 'Tech Support Pro',
        specialty: 'IT Support',
        rating: 4.5,
        reviews: 25,
        description: 'Professional computer and IT support for home and business.',
        location: 'Av. Paulista, 1500',
        hour: '8:00 AM - 6:00 PM',
        contact: '+55 11 90000-0000',
        photos: ['assets/images/services.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Computer Repair', category: 'IT Support' },
          { name: 'Network Setup', category: 'IT Support' }
        ]
      },
      {
        id: '11',
        name: 'Legal Consult',
        specialty: 'Lawyer',
        rating: 4.8,
        reviews: 18,
        description: 'Legal consultation and advice for various legal matters.',
        location: 'Rua 7 de Abril, 200',
        hour: '9:00 AM - 5:00 PM',
        contact: '+55 11 98888-8888',
        photos: ['assets/images/services.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Legal Consultation', category: 'Legal' },
          { name: 'Contract Review', category: 'Legal' }
        ]
      },
      {
        id: '12',
        name: 'Accounting Plus',
        specialty: 'Accountant',
        rating: 4.6,
        reviews: 32,
        description: 'Professional accounting and tax services for individuals and businesses.',
        location: 'Av. São João, 500',
        hour: '8:00 AM - 6:00 PM',
        contact: '+55 11 97777-7777',
        photos: ['assets/images/services.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Tax Preparation', category: 'Accounting' },
          { name: 'Bookkeeping', category: 'Accounting' }
        ]
      },
      // Others
      {
        id: '13',
        name: 'Pet Care Center',
        specialty: 'Veterinarian',
        rating: 4.9,
        reviews: 55,
        description: 'Comprehensive veterinary care and pet grooming services.',
        location: 'Rua dos Cães, 100',
        hour: '8:00 AM - 7:00 PM',
        contact: '+55 11 95555-4444',
        photos: ['assets/images/others.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Pet Consultation', category: 'Veterinary' },
          { name: 'Pet Grooming', category: 'Pet Care' }
        ]
      }
    ];

    if (id) {
      this.service = mock.find(s => s.id === id) || null;
      if (this.service) {
        // Store original data for cancel functionality
        this.originalService = JSON.parse(JSON.stringify(this.service));
      }
    }
  }

  toggleEditMode() {
    if (this.isOwner && this.service) {
      if (this.isEditMode) {
        // Save changes and go back to view mode
        this.saveChanges();
        this.router.navigate(['/professional', this.service.id]);
      } else {
        // Enter edit mode
        this.router.navigate(['/professional', this.service.id, 'edit']);
      }
    }
  }

  saveChanges() {
    // Here you would implement the actual save logic
    console.log('Saving changes...');
    // In a real app, you'd make an API call to save the changes
  }

  cancelEdit() {
    if (this.originalService && this.service) {
      // Restore original data
      this.service = JSON.parse(JSON.stringify(this.originalService));
      this.router.navigate(['/professional', this.service!.id]);
    }
  }

  addService() {
    if (this.service) {
      this.service.services.push({ name: '', category: '' });
    }
  }

  removeService(index: number) {
    if (this.service && this.service.services.length > 1) {
      this.service.services.splice(index, 1);
    }
  }

  getStars(rating: number): boolean[] {
    const rounded = Math.round(rating);
    return Array(5).fill(false).map((_, i) => i < rounded);
  }

  // Rating methods
  onRatingChange(rating: number) {
    this.userRating = rating;
    console.log('User rating changed to:', rating);
  }

  submitRating() {
    if (this.userRating > 0 && this.service) {
      // In a real app, you would make an API call to submit the rating
      console.log('Submitting rating:', this.userRating, 'for service:', this.service.id);
      
      // Simulate API call
      setTimeout(() => {
        // Update the service rating (in a real app, this would come from the server)
        if (this.service) {
          const newReviews = this.service.reviews + 1;
          const newRating = ((this.service.rating * this.service.reviews) + this.userRating) / newReviews;
          
          this.service.rating = Math.round(newRating * 10) / 10; // Round to 1 decimal place
          this.service.reviews = newReviews;
        }
        
        this.ratingSubmitted = true;
        this.showSuccessToast('Rating submitted successfully!');
        
        // Reset user rating after a delay
        setTimeout(() => {
          this.userRating = 0;
          this.ratingSubmitted = false;
        }, 3000);
      }, 1000);
    }
  }

  showSuccessToast(message: string) {
    this.toastMessage = message;
    this.toastColor = 'success';
    this.showToast = true;
  }

  showErrorToast(message: string) {
    this.toastMessage = message;
    this.toastColor = 'danger';
    this.showToast = true;
  }

  onToastDismiss() {
    this.showToast = false;
  }
}
