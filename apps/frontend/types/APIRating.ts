import { RatingType } from "./RatingType";

export interface APIRating {
  id: number;
  authorId: number;
  courseFeedbackClassNo: string;
  type: RatingType;
  value: number;
  createdAt: string;
  updatedAt: string;
}
