import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Social media links (replace with actual URLs if needed)
  socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: 'fab fa-facebook-f',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'fab fa-linkedin-in',
    },
  ];

  // Navigation links
  navLinks = [
    { label: 'Home', url: '/' },
    { label: 'Blogs', url: '/blogs' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' },
  ];

  currentYear = new Date().getFullYear(); // Dynamic year for copyright
}
