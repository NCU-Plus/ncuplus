import { APIReaction } from "./APIReaction";

export interface APIComment {
  id: number;
  authorId: number;
  content: string;
  reactions: APIReaction[];
  createdAt: Date;
  updatedAt: Date;
}
