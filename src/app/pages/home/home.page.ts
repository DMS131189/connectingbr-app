import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButtons,IonButton]
})
export class HomePage implements OnInit {

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
