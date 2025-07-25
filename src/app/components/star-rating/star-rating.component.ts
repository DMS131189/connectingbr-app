import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon]
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Input() readonly: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = [];

  constructor() {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.updateStars();
  }

  ngOnChanges() {
    this.updateStars();
  }

  updateStars() {
    this.stars = [];
    for (let i = 1; i <= this.maxRating; i++) {
      this.stars.push(i <= this.rating);
    }
  }

  onStarClick(index: number) {
    if (!this.readonly) {
      const newRating = index + 1;
      this.rating = newRating;
      this.updateStars();
      this.ratingChange.emit(newRating);
    }
  }

  onStarHover(index: number) {
    if (!this.readonly) {
      this.updateStars();
      for (let i = 0; i <= index; i++) {
        this.stars[i] = true;
      }
    }
  }

  onStarLeave() {
    if (!this.readonly) {
      this.updateStars();
    }
  }

  getRatingText(): string {
    const texts = ['', 'Bad', 'Poor', 'Fair', 'Good', 'Great'];
    return texts[this.rating] || '';
  }
}
