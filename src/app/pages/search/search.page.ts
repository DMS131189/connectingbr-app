import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon, CommonModule, FormsModule]
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
        name: 'Hair Styling',
        category: 'beauty',
        description: 'Professional hair cutting and styling',
        price: '$45-80',
        rating: 4.8,
        provider: 'Salon Maria',
        reviews: 50
      },
      {
        id: '5',
        name: 'Home Cleaning',
        category: 'services',
        description: 'Complete residential cleaning',
        price: '$80-150',
        rating: 4.7,
        provider: 'Clean Home',
        reviews: 40
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
    this.router.navigate(['/profile', service.id]);
  }

  getStars(rating: number): boolean[] {
    const rounded = Math.round(rating);
    return Array(5).fill(false).map((_, i) => i < rounded);
  }
}
