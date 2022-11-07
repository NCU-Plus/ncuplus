import { ReactionType } from "./ReactionType";

export interface APIReaction {
  id: number;
  authorId: number;
  type: ReactionType;
  commentId?: number;
  reviewId?: number;
  createdAt: Date;
  updatedAt: Date;
}
