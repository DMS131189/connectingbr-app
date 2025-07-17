import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
