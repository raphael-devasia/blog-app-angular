// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private backendUrl = environment.backendUrl;

//   private userProfile = JSON.parse(localStorage.getItem('userProfile')!);
//   private userId: string | null = null;

//   constructor(private http: HttpClient) {}

//   getPosts(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.backendUrl}/posts/all/${this.userId}`);
//   }
//   getAllPosts(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.backendUrl}/posts/all`);
//   }
//   getAllUserPosts(userId: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.backendUrl}/posts/all/${userId}`);
//   }
//   getPostById(postId: string): Observable<any> {
//     return this.http.get<any>(`${this.backendUrl}/posts/${postId}`);
//   }

//   deletePost(postId: string): Observable<void> {
//     return this.http.delete<void>(`${this.backendUrl}/posts/${postId}`);
//   }

//   toggleFeatured(postId: string, isFeatured: boolean): Observable<void> {
//     return this.http.patch<void>(`${this.backendUrl}/posts/${postId}`, {
//       isFeatured: isFeatured,
//     });
//   }
  
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { SuccessMessageResponse, SuccessResponse } from '../model/api-response.interface';
import { Post } from '../model/post';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = environment.backendUrl;

  private userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  private userId: string | null = this.userProfile?.userId || null; // Type-safe access

  constructor(private http: HttpClient) {}

  getPosts(): Observable<SuccessResponse<Post[]>> {
    return this.http.get<SuccessResponse<Post[]>>(
      `${this.backendUrl}/posts/all/${this.userId}`
    );
  }

  getAllPosts(): Observable<SuccessResponse<Post[]>> {
    return this.http.get<SuccessResponse<Post[]>>(
      `${this.backendUrl}/posts/all`
    );
  }

  getAllUserPosts(userId: string): Observable<SuccessResponse<Post[]>> {
    return this.http.get<SuccessResponse<Post[]>>(
      `${this.backendUrl}/posts/all/${userId}`
    );
  }

  getPostById(postId: string): Observable<SuccessResponse<Post>> {
    return this.http.get<SuccessResponse<Post>>(
      `${this.backendUrl}/posts/${postId}`
    );
  }

  deletePost(postId: string): Observable<SuccessMessageResponse> {
    return this.http.delete<SuccessMessageResponse>(
      `${this.backendUrl}/posts/${postId}`
    );
  }

  toggleFeatured(
    postId: string,
    isFeatured: boolean
  ): Observable<SuccessResponse<Post>> {
    return this.http.patch<SuccessResponse<Post>>(
      `${this.backendUrl}/posts/${postId}`,
      {
        isFeatured: isFeatured,
      }
    );
  }
}