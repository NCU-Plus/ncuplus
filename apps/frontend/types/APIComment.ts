import type { APIReaction } from "./APIReaction";

export interface APIComment {
  id: number;
  authorId: number;
  content: string;
  reactions: APIReaction[];
  courseFeedbackClassNo: string;
  createdAt: string;
  updatedAt: string;
}
