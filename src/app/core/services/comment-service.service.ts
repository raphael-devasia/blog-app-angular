import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponse, IComment } from '../model/comment.interface';
import { DeleteResponse } from '../model/delete-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private backendUrl = environment.backendUrl;
 
   private userProfile = JSON.parse(localStorage.getItem('userProfile')!);
   private userId: string | null = null;
 
   constructor(private http: HttpClient) {}
 
   
   getPostComments(postId: string): Observable<any[]> {
     return this.http.get<IComment[]>(`${this.backendUrl}/comments/${postId}`);
   }
   getUserComments(userId: string): Observable<any[]> {
     return this.http.get<IComment[]>(`${this.backendUrl}/posts/all/${userId}`);
   }
   createComment(comment: any): Observable<any> {
     
 
     return this.http.post<CommentResponse>(
       `${this.backendUrl}/comments`,
       comment
     );
   }
 
   deleteComment(commentId: any): Observable<any> {
    
 
     return this.http.delete<DeleteResponse>(
       `${this.backendUrl}/comments/${commentId}`
     );
   }
}
