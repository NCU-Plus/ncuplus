import { APIReaction } from "./APIReaction";

export interface APIReview {
  id: number;
  authorId: number;
  content: string;
  reactions: APIReaction[];
  courseFeedbackClassNo: string;
  createdAt: string;
  updatedAt: string;
}
