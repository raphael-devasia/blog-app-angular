import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../model/post';
import { SuccessResponse } from '../model/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UploadServiceService {
  constructor(private http: HttpClient) {}

  private backendUrl = environment.backendUrl;

  generatePresignedUrl(
    fileName: string,
    fileType: string
  ): Observable<{ presignedUrl: string; fileUrl: string }> {
    // Construct the URL to request the presigned URL from the backend
    const url = `${this.backendUrl}/posts/get-url?fileName=${encodeURIComponent(
      fileName
    )}&fileType=${encodeURIComponent(fileType)}`;

    // Make the HTTP GET request to your backend to fetch the presigned URL
    return this.http.get<{ presignedUrl: string; fileUrl: string }>(url);
  }

  uploadFileToS3(url: string, file: File, fileUrl: string): Observable<string> {
    console.log('File type:', file.type);
    console.log(file);

    return this.http
      .put(url, file, {
        headers: { 'Content-Type': file.type },
      })
      .pipe(map(() => fileUrl));
  }
  postBlogPost(post: Post): Observable<SuccessResponse<Post>> {
    return this.http.post<SuccessResponse<Post>>(
      `${this.backendUrl}/posts`,
      post
    );
  }
  updateBlogPost(
    post: Post,
    postId: string
  ): Observable<SuccessResponse<Post>> {
    return this.http.put<SuccessResponse<Post>>(
      `${this.backendUrl}/posts/${postId}`,
      post
    );
  }
}
