export interface IComment {
  _id?: string;
  postId: string;
  userId: string;
  comment: string;
  name: string;
  email: string;
  parentCommentId?: string | null;
  replies?: IComment[];
  createdAt?: string | Date; // Date might come as ISO string from API
  updatedAt?: string | Date; // Date might come as ISO string from API
}


export interface CommentResponse {
  success: boolean;
  data: IComment;
  message?: string;
}