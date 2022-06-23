import { APIReaction } from "./APIReaction";

export interface APIReview {
  id: number;
  authorId: number;
  content: string;
  reactions: APIReaction[];
  createdAt: Date;
  updatedAt: Date;
}
