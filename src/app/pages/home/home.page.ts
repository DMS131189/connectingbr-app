import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonButton,IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class HomePage implements OnInit {
  categories = [
    {
      name: 'Health',
      value: 'health',
    },
    {
      name: 'Beauty',
      value: 'beauty',
    },
    {
      name: 'Services',
      value: 'services',
    },
    {
      name: 'Outros',
      value: 'outros',
    },
    
  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onLogin() {
    // const email = this.email;
    // const password = this.password;
    // const isLoggedIn = this.authService.login(email, password);
    // if (isLoggedIn) {
      this.router.navigate(['login']);
    // }
  }


  

}
