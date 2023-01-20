import { APIComment } from "./APIComment";
import { APICourseInfo } from "./APICourseInfo";
import { APIPastExam } from "./APIPastExam";
import { APIRating } from "./APIRating";
import { APIReview } from "./APIReview";

export interface APICourseFeedback {
  classNo: string;
  ratings: APIRating[];
  comments: APIComment[];
  reviews: APIReview[];
  courseInfos: APICourseInfo[];
  pastExams: APIPastExam[];
}
