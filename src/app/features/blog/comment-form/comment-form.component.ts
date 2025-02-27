import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { UserService } from '../../services/user.service';
// import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() postId!: string;
  @Input() userId!: string;

  comments: any[] = [];
  commentForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.userId) {
      this.initForm();
    }
  }

  initForm() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const fullName = `${userProfile.firstName || ''} ${
      userProfile.lastName || ''
    }`.trim();
    const email = userProfile.email || '';
    this.commentForm = this.fb.group({
      name: [
        { value: fullName, disabled: true }, // Prefill and disable
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
        ],
      ],
      email: [
        { value: email, disabled: true }, // Prefill and disable
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          (control: any) => {
            const value = control.value?.trim();
            if (!value || value.length < 5) {
              return { meaningfulContent: true };
            }
            return null;
          },
        ],
      ],
    });
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.commentForm.invalid) {
      Object.keys(this.commentForm.controls).forEach((key) => {
        const control = this.commentForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    // const formValues = this.commentForm.value;
    const formValues = this.commentForm.getRawValue();
    const commentData = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      comment: formValues.comment.trim(),
      postId: this.postId,
      userId: this.userId,
    };

    this.userService.createComment(commentData).subscribe({
      next: (response) => {
        this.toastr.success('Comment posted successfully');
        this.resetForm();
      },
      error: (error) => {
        this.toastr.error('Error posting comment');
        console.error('Error:', error);
      },
    });
  }

  // resetForm() {
  //   this.submitted = false;
  //   this.commentForm.reset();
  // }
  resetForm() {
    this.submitted = false;
    // Reset only the comment field, keep name and email disabled with original values
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const fullName = `${userProfile.firstName || ''} ${
      userProfile.lastName || ''
    }`.trim();
    const email = userProfile.email || '';
    this.commentForm.patchValue({
      name: fullName,
      email: email,
      comment: '',
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.commentForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required`;
    }
    if (control?.hasError('minlength')) {
      return `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } must be at least ${fieldName === 'name' ? '3' : '5'} characters`;
    }
    if (control?.hasError('pattern')) {
      if (fieldName === 'name')
        return 'Only letters and spaces between words are allowed';
      if (fieldName === 'email') return 'Please enter a valid email address';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('meaningfulContent')) {
      return 'Comment must contain meaningful content (at least 5 characters)';
    }
    return '';
  }
}
