import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RelativeDatePipe } from '../../../core/pipes/relative-date.pipe';
import { Post } from '../../../core/model/post';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    RelativeDatePipe,
    RouterLink,
    DeleteModalComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  userId!: string;
  private userService = inject(UserService);
  router = inject(Router);
  toastr = inject(ToastrService);
  isExpanded = false;
  currentPage = 1; // Tracks the current page when expanded
  blogs = [];
  isMyPosts: boolean = false;
  showDeleteModal: boolean = false;
  selectedPostId!: string;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    
    
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    this.userId = userProfile.userId || '';
    this.isMyPosts = this.route.snapshot.routeConfig?.path === 'my-posts';

    this.fetchPosts();
  }

  // Calculate total pages based on 6 posts per page
  get totalPages(): number {
    return Math.ceil(this.blogs.length / 6);
  }
  fetchPosts() {
    
    
    const fetchMethod = this.isMyPosts
      ? this.userService.getAllUserPosts(this.userId)
      : this.userService.getAllPosts();

    fetchMethod.subscribe(
      (data: any) => {
        this.blogs = data.data; // Assuming `data.data` holds the array of blogs
        console.log(this.blogs);
      },
      (error) => {
        console.error('Error fetching posts:', error); // Log error details
        this.toastr.error('Failed to fetch posts');
      }
    );
  }

  // Get the blogs to display based on current page
  get displayedBlogs(): any[] {
    if (!this.isExpanded) {
      return this.blogs.slice(0, 3); // Show only 3 initially
    }
    const startIndex = (this.currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return this.blogs.slice(startIndex, endIndex); // Show 6 per page when expanded
  }

  toggleExpand() {
    this.isExpanded = true;
    this.currentPage = 1; // Reset to page 1 on expand
  }

  goToPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  editPost(postId: string) {
    // Navigate to an edit page or open a modal (implement as needed)
    this.router.navigate(['/edit-post', postId]);
    console.log('Edit post:', postId);
  }

  // deletePost(postId: string) {
  //   if (confirm('Are you sure you want to delete this post?')) {
  //     this.userService.deletePost(postId).subscribe({
  //       next: () => {
  //         this.toastr.success('Post deleted successfully');
  //         this.blogs = this.blogs.filter((blog: Post) => blog._id !== postId);
  //       },
  //       error: (error) => {
  //         this.toastr.error('Failed to delete post');
  //         console.error('Delete error:', error);
  //       },
  //     });
  //   }
  // }

  deletePost(postId: string) {
    this.showDeleteModal = true;
    this.selectedPostId = postId;
  }
  closeDeleteModal() {
    this.showDeleteModal = false;
  }
  deleteResource(postId: string, target: string): void {
    console.log(`Deleting ${target} with ID: ${postId}`);
    this.userService.deletePost(postId).subscribe(
      () => {
        this.blogs = this.blogs.filter((post:Post) => post._id !== postId);
        this.toastr.success(`${target} deleted successfully`, 'Success');
      },
      (error) => this.toastr.error(`Failed to delete Post`, 'Error')
    );
  }
}
