export interface ImageUploadResponse {
  imageUrl: string;
}

export interface PresignedUrlResponse {
  success: true;
  presignedUrl: string;
  fileUrl: string;
}
