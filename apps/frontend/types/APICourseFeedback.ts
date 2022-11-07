import { APIComment } from "./APIComment";
import { APICourseInfo } from "./APICourseInfo";
import { APIPastExam } from "./APIPastExam";
import { APIReview } from "./APIReview";

export interface APICourseFeedback {
  classNo: string;
  comments: APIComment[];
  reviews: APIReview[];
  courseInfos: APICourseInfo[];
  pastExams: APIPastExam[];
}
