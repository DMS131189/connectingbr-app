import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.page.html',
  styleUrls: ['./add-edit-service.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddEditServicePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
