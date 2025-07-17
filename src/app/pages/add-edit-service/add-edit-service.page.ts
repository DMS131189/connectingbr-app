import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-add-edit-service',
  templateUrl: './add-edit-service.page.html',
  styleUrls: ['./add-edit-service.page.scss'],
  standalone: true,
  imports: [AppHeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddEditServicePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
