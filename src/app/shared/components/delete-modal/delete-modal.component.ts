import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Input() selectedPostId!: string;
  @Input() selectedCommentId!: string;

  @Output() closeModal = new EventEmitter<void>();
  @Input() deleteItem!: (userId: string, target: string) => void;
  @Input() deleteComment!: (commentId: string, target: string) => void;

  onclose() {
    this.closeModal.emit();
  }
  onDelete() {
    console.log(this.selectedPostId);
    if (this.selectedCommentId) {
      this.deleteComment(this.selectedCommentId, 'comment');
      this.onclose();
    } else if (this.selectedPostId) {
      this.deleteItem(this.selectedPostId, 'post');
      this.onclose();
    }
  }
}
