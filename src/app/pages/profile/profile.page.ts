import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  service: ServiceProfile | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadService(id);
  }

  loadService(id: string | null) {
    // Mock de dados
    const mock: ServiceProfile[] = [
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
      }
    ];
    this.service = mock.find(s => s.id === id) || null;
  }

  getStars(rating: number): boolean[] {
    const rounded = Math.round(rating);
    return Array(5).fill(false).map((_, i) => i < rounded);
  }
}
