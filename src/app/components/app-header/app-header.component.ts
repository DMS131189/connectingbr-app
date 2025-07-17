import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { business } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonIcon]
})
export class AppHeaderComponent {
  constructor(private router: Router) {
    addIcons({ business });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
} 