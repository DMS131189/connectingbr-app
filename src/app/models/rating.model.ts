export interface RatingResponse {
  newRating: number;
  totalReviews: number;
}

export interface RatingRequest {
  professionalId: number;
  rating: number;
}
