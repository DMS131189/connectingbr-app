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
        description: 'Complete veterinary care and pet grooming services.',
        location: 'Rua dos Pinheiros, 300',
        hour: '8:00 AM - 7:00 PM',
        contact: '+55 11 96666-6666',
        photos: ['assets/images/others.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Veterinary Care', category: 'Pet Care' },
          { name: 'Pet Grooming', category: 'Pet Care' }
        ]
      },
      {
        id: '14',
        name: 'Tutor Academy',
        specialty: 'Private Tutor',
        rating: 4.4,
        reviews: 22,
        description: 'Private tutoring services for all subjects and levels.',
        location: 'Av. Consolação, 400',
        hour: '9:00 AM - 8:00 PM',
        contact: '+55 11 95555-5555',
        photos: ['assets/images/others.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Math Tutoring', category: 'Education' },
          { name: 'English Classes', category: 'Education' }
        ]
      },
      {
        id: '15',
        name: 'Event Planner',
        specialty: 'Event Coordinator',
        rating: 4.8,
        reviews: 38,
        description: 'Professional wedding and event planning services.',
        location: 'Rua Bela Cintra, 600',
        hour: '9:00 AM - 6:00 PM',
        contact: '+55 11 94444-4444',
        photos: ['assets/images/others.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Wedding Planning', category: 'Events' },
          { name: 'Corporate Events', category: 'Events' }
        ]
      },
      {
        id: '16',
        name: 'Photography Pro',
        specialty: 'Photographer',
        rating: 4.7,
        reviews: 29,
        description: 'Professional photography for weddings, events, and portraits.',
        location: 'Av. Ibirapuera, 800',
        hour: '8:00 AM - 8:00 PM',
        contact: '+55 11 93333-3333',
        photos: ['assets/images/others.png'],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.457!2d-46.656574!3d-23.588068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr',
        services: [
          { name: 'Wedding Photography', category: 'Photography' },
          { name: 'Portrait Sessions', category: 'Photography' }
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
