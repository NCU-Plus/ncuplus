export enum ReportType {
  SPAM = "spam",
  ABUSE = "abuse",
  NSFW = "nsfw",
  OTHER = "other",
}

export enum TargetType {
  COMMENT = "comment",
  REVIEW = "review",
  PAST_EXAM = "past_exam",
}

export interface APIReport {
  id: number;
  type: ReportType;
  targetType: TargetType;
  targetId: number;
  description: string;
  reporter: number;
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
