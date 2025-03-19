import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Post } from '../../../core/model/post';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentServiceService } from '../../../core/services/comment-service.service';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    CommonModule,
    CommentsListComponent,
    CommentFormComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent {
  postId!: string;

  posts!: Post;
  userId!: string;
  comments: any[] = [];

  private userService = inject(UserService);
  private commentService = inject(CommentServiceService);

  toastr = inject(ToastrService);

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('postId') || ''; // 'id' is the dynamic route parameter

      console.log('the param is ', this.postId);
    });
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    this.userId = userProfile.userId || '';

    this.getPost();
    this.fetchComments();
  }
  fetchComments() {
    this.commentService.getPostComments(this.postId).subscribe({
      next: (response: any) => {
        this.comments = response.data;
      },
      error: (error) => {
        this.toastr.error('Error fetching comments');
        console.error('Error:', error);
      },
    });
  }

  getPost() {
    this.userService.getPostById(this.postId).subscribe(
      (data: any) => {
        this.posts = data.data;
        console.log(this.posts);
        // this.userId=this.posts.userId;
      },
      (error) => {
        this.toastr.error('Failed to fetch post');
      }
    );
  }
  onCommentSubmitted() {
    this.fetchComments(); // Refresh comments for both top-level and replies
  }
}
