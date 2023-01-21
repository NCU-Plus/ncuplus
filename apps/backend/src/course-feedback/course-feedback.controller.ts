import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  BadRequestException,
  Put,
  Delete,
  ValidationPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileMimetypeValidator } from 'src/pipes/file-mimetype.validator';
import { Comment, Review } from './content.entity';
import { CourseFeedbackService } from './course-feedback.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CreatePastExamDto } from './dtos/create-past-exam.dto';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { CommentHook } from './hooks/comment.hook';
import { PastExamHook } from './hooks/past-exam.hook';
import { ReviewHook } from './hooks/review.hook';
import { PastExam } from './past-exam.entity';
import { Reaction } from './reaction.entity';
import { Rating } from './rating,entity';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { RatingHook } from './hooks/rating.hook';
import { UpdateRatingDto } from './dtos/update-rating.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/types/ApiResponseDto';
import { CourseFeedbackDto } from './dtos/course-feedback.dto';
import { CommentDto } from './dtos/comment.dto';
import { ReactionDto } from './dtos/reaction.dto';
import { ReviewDto } from './dtos/review.dto';
import { PastExamDto } from './dtos/past-exam.dto';
import { RatingDto } from './dtos/rating.dto';

@ApiTags('Course Feedbacks')
@Controller()
export class CourseFeedbackController {
  constructor(private readonly courseFeedbackService: CourseFeedbackService) {}

  @ApiOkResponse({
    description: 'Get course feedback.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CourseFeedbackDto) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: "The class doesn't exist.",
  })
  @Get('course-feedbacks/:classNo')
  async getCourseFeedback(@Param('classNo') classNo: string) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseFeedbackService.getCourseFeedback(classNo),
    };
  }

  @ApiTags('Comments')
  @ApiOkResponse({
    description: 'Get all comments.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(CommentDto) },
            },
          },
        },
      ],
    },
  })
  @Get('comments')
  async getAllComments() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseFeedbackService.findAllComment(),
    };
  }

  @ApiTags('Comments')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CommentDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The class doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Post('course-feedbacks/:classNo/comments')
  @UseAbility(Actions.create, Comment)
  async createComment(
    @Request() req,
    @Param('classNo') classNo: string,
    @Body(new ValidationPipe({ transform: true }))
    createCommentDto: CreateCommentDto,
  ) {
    return {
      statusCode: 201,
      message: 'OK',
      data: await this.courseFeedbackService.createComment(
        classNo,
        req.user.id,
        createCommentDto,
      ),
    };
  }

  @ApiTags('Comments')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CommentDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The comment doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Put('comments/:id')
  @UseAbility(Actions.update, Comment, CommentHook)
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateCommentDto: UpdateCommentDto,
  ) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseFeedbackService.editComment(id, updateCommentDto),
    };
  }

  @ApiTags('Comments')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete successfully.',
    schema: {
      $ref: getSchemaPath(ApiResponseDto),
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The comment doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Delete('comments/:id')
  @UseAbility(Actions.delete, Comment, CommentHook)
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    await this.courseFeedbackService.deleteComment(id);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @ApiTags('Comments', 'Reactions')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'React to comment successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ReactionDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The comment doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Post('comments/:id/reactions')
  @UseAbility(Actions.create, Reaction) // check comment or review author is too hard to implement. help wanted.
  async reactToComment(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    createReactionDto: CreateReactionDto,
  ) {
    return {
      statusCode: 201,
      message: 'OK',
      data: await this.courseFeedbackService.reactToComment(
        id,
        req.user.id,
        createReactionDto,
      ),
    };
  }

  @ApiTags('Reviews')
  @ApiOkResponse({
    description: 'Get all reviews.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(ReviewDto),
              },
            },
          },
        },
      ],
    },
  })
  @Get('reviews')
  async getAllReviews() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseFeedbackService.findAllReview(),
    };
  }

  @ApiTags('Reviews')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ReviewDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The class doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Post('course-feedbacks/:classNo/reviews')
  @UseAbility(Actions.create, Review)
  async createReview(
    @Request() req,
    @Param('classNo') classNo: string,
    @Body(new ValidationPipe({ transform: true }))
    createReviewDto: CreateReviewDto,
  ) {
    return {
      statusCode: 201,
      message: 'OK',
      data: await this.courseFeedbackService.createReview(
        classNo,
        req.user.id,
        createReviewDto,
      ),
    };
  }

  @ApiTags('Reviews')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ReviewDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The review doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Put('reviews/:id')
  @UseAbility(Actions.update, Review, ReviewHook)
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateReviewDto: UpdateReviewDto,
  ) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseFeedbackService.editReview(id, updateReviewDto),
    };
  }

  @ApiTags('Reviews')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete successfully.',
    schema: {
      $ref: getSchemaPath(ApiResponseDto),
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The review doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Delete('reviews/:id')
  @UseAbility(Actions.delete, Review, ReviewHook)
  async deleteReview(@Param('id', ParseIntPipe) id: number) {
    await this.courseFeedbackService.deleteReview(id);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @ApiTags('Reviews', 'Reactions')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'React to review successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ReactionDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The review doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Post('reviews/:id/reactions')
  @UseAbility(Actions.create, Reaction)
  async reactToReview(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    createReactionDto: CreateReactionDto,
  ) {
    return {
      statusCode: 201,
      message: 'OK',
      data: await this.courseFeedbackService.reactToReview(
        id,
        req.user.id,
        createReactionDto,
      ),
    };
  }

  @ApiTags('Past Exams')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreatePastExamDto) },
        {
          required: ['file'],
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: 'The file to upload.',
              nullable: false,
            },
          },
        },
      ],
    },
  })
  @ApiCreatedResponse({
    description: 'Upload past exam successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(PastExamDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: "The class doesn't exist.",
  })
  @HttpCode(201)
  @Post('course-feedbacks/:classNo/past-exams')
  @UseGuards(JwtAuthGuard, AccessGuard)
  @UseAbility(Actions.create, PastExam)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/past-exam/',
    }),
  )
  async uploadFile(
    @Request() req,
    @Param('classNo') classNo: string,
    @Body(new ValidationPipe({ transform: true }))
    createPastExamDto: CreatePastExamDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15728640 }), // 15MB
          new FileMimetypeValidator({
            acceptedMimetypes: [
              'application/pdf',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              'image/jpeg',
              'image/png',
              'image/jpg',
              'application/zip',
              'application/zip-compressed',
              'application/x-zip-compressed',
              'application/x-7z-compressed',
              'application/x-rar-compressed',
            ],
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is not accepted');
    return {
      statusCode: 201,
      message: 'Created',
      data: await this.courseFeedbackService.uploadPastExam(
        classNo,
        req.user.id,
        createPastExamDto,
        file,
      ),
    };
  }

  @ApiTags('Past Exams')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Past exam file.',
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization.',
  })
  @ApiNotFoundResponse({
    description: "The past exam doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Get('past-exams/:id')
  @UseAbility(Actions.read, PastExam)
  async getPastExam(@Param('id', ParseIntPipe) id: number) {
    return await this.courseFeedbackService.getPastExam(id);
  }

  @ApiTags('Past Exams')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete past exam successfully.',
    schema: {
      $ref: getSchemaPath(ApiResponseDto),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization.',
  })
  @ApiNotFoundResponse({
    description: "The past exam doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Delete('past-exams/:id')
  @UseAbility(Actions.delete, PastExam, PastExamHook)
  async deletePastExam(@Param('id', ParseIntPipe) id: number) {
    await this.courseFeedbackService.deletePastExam(id);
    return { statusCode: 200, message: 'OK' };
  }

  @ApiTags('Ratings')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(RatingDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization.',
  })
  @ApiNotFoundResponse({
    description: "The course doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Post('course-feedbacks/:classNo/ratings')
  @UseAbility(Actions.create, Rating)
  async createRating(
    @Request() req,
    @Param('classNo') classNo: string,
    @Body(new ValidationPipe({ transform: true }))
    createRatingDto: CreateRatingDto,
  ) {
    return {
      statusCode: 201,
      message: 'OK',
      data: await this.courseFeedbackService.createRating(
        classNo,
        req.user.id,
        createRatingDto,
      ),
    };
  }

  @ApiTags('Ratings')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(RatingDto),
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization.',
  })
  @ApiNotFoundResponse({
    description: "The rating doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Put('ratings/:id')
  @UseAbility(Actions.update, Rating, RatingHook)
  async updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateRatingDto: UpdateRatingDto,
  ) {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.courseFeedbackService.editRating(id, updateRatingDto),
    };
  }

  @ApiTags('Ratings')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete successfully.',
    schema: {
      $ref: getSchemaPath(ApiResponseDto),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'No authorization.',
  })
  @ApiNotFoundResponse({
    description: "The rating doesn't exist.",
  })
  @UseGuards(JwtAuthGuard, AccessGuard)
  @Delete('ratings/:id')
  @UseAbility(Actions.delete, Rating, RatingHook)
  async deleteRating(@Param('id', ParseIntPipe) id: number) {
    await this.courseFeedbackService.deleteRating(id);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }
}
