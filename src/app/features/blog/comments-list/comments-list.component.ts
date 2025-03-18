import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component'; // Adjust path
import { UserService } from '../../../core/services/user.service'; // Adjust path
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, CommentFormComponent, DeleteModalComponent],
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
})
export class CommentsListComponent implements OnInit {
  @Input() comments: any[] = [];
  @Input() postId!: string;
  @Input() currentUserId!: string;
  showDeleteModal: boolean = false;
  selectedCommentId!: string;
  toastr = inject(ToastrService);

  showReplyForm: { [key: string]: boolean } = {};

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.userService.getPostComments(this.postId).subscribe({
      next: (response: any) => {
        this.comments = response.data;
      },
      error: (error) => {
        this.toastr.error('Error fetching comments');
        console.error('Error:', error);
      },
    });
  }
  // Check if the comment belongs to the current user
  isCurrentUser(userId: string): boolean {
    return this.currentUserId === userId;
  }

  // Toggle reply form visibility
  toggleReplyForm(commentId: string): void {
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
  }


  onReplySubmitted(): void {
    this.loadComments(); // Refresh all comments after a reply is posted
  }

  // Delete a comment or reply
  deleteComments(commentId: string): void {
    if (
      confirm(
        'Are you sure you want to delete this comment and all its replies?'
      )
    ) {
      this.userService.deleteComment(commentId).subscribe({
        next: () => {
          this.comments = this.removeCommentFromTree(this.comments, commentId);
        },
        error: (error) => console.error('Error deleting comment:', error),
      });
    }
  }
  deleteResource(commentId: string, target: string): void {
    console.log(`Deleting ${target} with ID: ${commentId}`);
    this.userService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.removeCommentFromTree(this.comments, commentId);
        this.toastr.success(`${target} deleted successfully`, 'Success');
      },
      error: (error) => this.toastr.error(`Failed to delete Comment`, 'Error'),
    });
  }

  deleteComment(commentId: string) {
    this.showDeleteModal = true;
    this.selectedCommentId = commentId;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  // Recursively add a reply to the comment tree
  private addReplyToTree(
    comments: any[],
    reply: any,
    parentCommentId: string
  ): void {
    for (const comment of comments) {
      if (comment._id === parentCommentId) {
        if (!comment.replies) comment.replies = [];
        comment.replies.push(reply);
        return;
      }
      if (comment.replies?.length) {
        this.addReplyToTree(comment.replies, reply, parentCommentId);
      }
    }
  }

  // Recursively remove a comment from the tree
  private removeCommentFromTree(comments: any[], commentId: string): any[] {
    return comments
      .filter((comment) => comment._id !== commentId)
      .map((comment) => ({
        ...comment,
        replies: comment.replies
          ? this.removeCommentFromTree(comment.replies, commentId)
          : [],
      }));
  }
}
