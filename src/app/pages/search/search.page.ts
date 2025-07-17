import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  provider: string;
  reviews: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  category: string = '';
  services: Service[] = [];
  filteredServices: Service[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.category = params['category'] || '';
      this.loadServices();
      this.filterServices();
    });
  }

  loadServices() {
    // Serviços fictícios para exemplo
    this.services = [
      // Health Services
      {
        id: '1',
        name: 'Dr. Aria Souza',
        category: 'health',
        description: '20 years experience',
        price: '',
        rating: 4.5,
        provider: 'Clinic Life',
        reviews: 20
      },
      {
        id: '2',
        name: 'Dr. Refivel Costa',
        category: 'health',
        description: '30 years experience',
        price: '',
        rating: 5.0,
        provider: 'Health Center',
        reviews: 163
      },
      {
        id: '3',
        name: 'Dra. Cafta Perctra',
        category: 'health',
        description: '11 years experience',
        price: '',
        rating: 4.0,
        provider: 'Wellness Clinic',
        reviews: 36
      },
      {
        id: '4',
        name: 'Dr. Luis Silva',
        category: 'health',
        description: 'Cardiologist specialist',
        price: '',
        rating: 4.8,
        provider: 'Heart Clinic',
        reviews: 45
      },
      // Beauty Services
      {
        id: '5',
        name: 'Salon Maria',
        category: 'beauty',
        description: 'Professional hair cutting and styling',
        price: '$45-80',
        rating: 4.8,
        provider: 'Salon Maria',
        reviews: 50
      },
      {
        id: '6',
        name: 'Beauty Studio Ana',
        category: 'beauty',
        description: 'Makeup and beauty treatments',
        price: '$60-120',
        rating: 4.6,
        provider: 'Beauty Studio',
        reviews: 35
      },
      {
        id: '7',
        name: 'Nail Art Studio',
        category: 'beauty',
        description: 'Professional nail care and design',
        price: '$30-60',
        rating: 4.9,
        provider: 'Nail Studio',
        reviews: 28
      },
      {
        id: '8',
        name: 'Spa Relax',
        category: 'beauty',
        description: 'Massage and spa treatments',
        price: '$80-150',
        rating: 4.7,
        provider: 'Spa Center',
        reviews: 42
      },
      // Services
      {
        id: '9',
        name: 'Clean Home',
        category: 'services',
        description: 'Complete residential cleaning',
        price: '$80-150',
        rating: 4.7,
        provider: 'Clean Home',
        reviews: 40
      },
      {
        id: '10',
        name: 'Tech Support Pro',
        category: 'services',
        description: 'Computer and IT support',
        price: '$50-100',
        rating: 4.5,
        provider: 'Tech Solutions',
        reviews: 25
      },
      {
        id: '11',
        name: 'Legal Consult',
        category: 'services',
        description: 'Legal consultation and advice',
        price: '$120-200',
        rating: 4.8,
        provider: 'Law Office',
        reviews: 18
      },
      {
        id: '12',
        name: 'Accounting Plus',
        category: 'services',
        description: 'Accounting and tax services',
        price: '$90-180',
        rating: 4.6,
        provider: 'Accounting Firm',
        reviews: 32
      },
      // Others
      {
        id: '13',
        name: 'Pet Care Center',
        category: 'others',
        description: 'Veterinary and pet grooming',
        price: '$40-80',
        rating: 4.9,
        provider: 'Pet Care',
        reviews: 55
      },
      {
        id: '14',
        name: 'Tutor Academy',
        category: 'others',
        description: 'Private tutoring services',
        price: '$30-60',
        rating: 4.4,
        provider: 'Education Center',
        reviews: 22
      },
      {
        id: '15',
        name: 'Event Planner',
        category: 'others',
        description: 'Wedding and event planning',
        price: '$200-500',
        rating: 4.8,
        provider: 'Event Solutions',
        reviews: 38
      },
      {
        id: '16',
        name: 'Photography Pro',
        category: 'others',
        description: 'Professional photography',
        price: '$150-300',
        rating: 4.7,
        provider: 'Photo Studio',
        reviews: 29
      }
    ];
  }

  filterServices() {
    this.filteredServices = this.services.filter(service => {
      const matchesCategory = this.category ? service.category.toLowerCase() === this.category.toLowerCase() : true;
      const matchesQuery = this.searchQuery ? service.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
      return matchesCategory && matchesQuery;
    });
  }

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value;
    this.filterServices();
  }

  onCall(service: Service) {
    // Aqui você pode implementar a lógica de chamada
    alert(`Calling ${service.name}...`);
  }

  goToProfile(service: Service) {
    this.router.navigate(['/professional', service.id]);
  }

  getStars(rating: number): boolean[] {
    const rounded = Math.round(rating);
    return Array(5).fill(false).map((_, i) => i < rounded);
  }
}
