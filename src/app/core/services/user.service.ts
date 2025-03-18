import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = environment.backendUrl;

  private userProfile = JSON.parse(localStorage.getItem('userProfile')!);
  private userId: string | null = null;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/posts/all/${this.userId}`);
  }
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/posts/all`);
  }
  getAllUserPosts(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/posts/all/${userId}`);
  }
  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/posts/${postId}`);
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/posts/${postId}`);
  }

  toggleFeatured(postId: string, isFeatured: boolean): Observable<void> {
    return this.http.patch<void>(`${this.backendUrl}/posts/${postId}`, {
      isFeatured: isFeatured,
    });
  }
  getPostComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/comments/${postId}`);
  }
  getUserComments(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/posts/all/${userId}`);
  }
  createComment(comment: any): Observable<any> {
    console.log('the comment is ', comment);

    return this.http.post<any>(`${this.backendUrl}/comments`, comment);
  }

  deleteComment(commentId: any): Observable<any> {
    console.log('the comment is ', commentId);

    return this.http.delete<any>(`${this.backendUrl}/comments/${commentId}`);
  }
}
