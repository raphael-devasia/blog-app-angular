import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = false; // Simulate login state (replace with AuthService logic)
  userName = 'Guest'; // Sample user name (replace with actual user data)

  navLinks = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
    
  ];

  constructor(private router: Router) {
    // Simulate checking login state (replace with real auth check)
    const token = localStorage.getItem('userToken');
    if (token) {
      this.isLoggedIn = true;
      // Assuming userProfile is stored in localStorage from login
      const userProfile = JSON.parse(
        localStorage.getItem('userProfile') || '{}'
      );
      this.userName = userProfile.firstName || 'Guest'; // Adjust based on your auth data structure
    }
  }

  writePost() {
    if (this.isLoggedIn) {
      this.router.navigate(['/write-post']); // Replace with your route
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/write-post' },
      }); // Redirect to login if not logged in
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userProfile');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
