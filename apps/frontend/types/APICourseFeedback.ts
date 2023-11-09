import type { APIComment } from "./APIComment";
import type { APICourseInfo } from "./APICourseInfo";
import type { APIPastExam } from "./APIPastExam";
import type { APIRating } from "./APIRating";
import type { APIReview } from "./APIReview";

export interface APICourseFeedback {
  classNo: string;
  ratings: APIRating[];
  comments: APIComment[];
  reviews: APIReview[];
  courseInfos: APICourseInfo[];
  pastExams: APIPastExam[];
}
