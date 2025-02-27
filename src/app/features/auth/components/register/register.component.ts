
// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from '../../../../core/services/auth-service.service';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;
//   authService = inject(AuthService);
//   submitted = false; // Added to track form submission
//   returnUrl: string = '/login';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private toastr: ToastrService,
//     private route: ActivatedRoute
//   ) {
    
//   }
//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.returnUrl = params['returnUrl'] || this.returnUrl;
//     });
//     this.registerForm = this.fb.group(
//       {
//         firstName: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(2),
//             Validators.pattern(/^[A-Za-z]+$/),
//           ],
//         ],
//         lastName: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(2),
//             Validators.pattern(/^[A-Za-z]+$/),
//           ],
//         ],
//         email: ['', [Validators.required, Validators.email]],
//         phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
//         password: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(8),
//             Validators.pattern(
//               /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//             ),
//           ],
//         ],
//         confirmPassword: ['', Validators.required],
//       },
//       { validator: this.matchPasswords }
//     );
//   }

//   private matchPasswords(group: FormGroup): { [key: string]: boolean } | null {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;
//     return password === confirmPassword ? null : { passwordsMismatch: true };
//   }

//   registerFormSubmit(): void {
//     this.submitted = true; // Mark form as submitted
//     if (this.registerForm.valid) {
//       console.log('Registration Form Data:', this.registerForm.value);

//       this.authService.registerUser(this.registerForm.value).subscribe({
//         next: (data) => {
//           this.toastr.success('Registration successful!', 'Success');
//          setTimeout(() => {
//            this.router.navigate(['/login'], {
//              queryParams: { returnUrl: this.returnUrl }, // Pass returnUrl to login
//            });
//          }, 2000);
//         },
//         error: (error) => {
//           console.error('Registration failed:', error);
//           const errorMessage =
//             error?.error?.message || 'An error occurred. Please try again.';
//           this.toastr.error(errorMessage, 'Error');
//         },
//       });
//     } else {
//       this.toastr.error('Please fill out the form correctly.', 'Invalid Form');
//     }
//   }

//   isFieldInvalid(fieldName: string): boolean {
//     const field = this.registerForm.get(fieldName);
//     return field
//       ? field.invalid && (field.touched || field.dirty || this.submitted)
//       : false;
//   }

//   getErrorMessage(fieldName: string): string {
//     const field = this.registerForm.get(fieldName);
//     if (field) {
//       if (field.errors?.['required']) {
//         return `${this.capitalize(fieldName)} is required`;
//       }
//       if (field.errors?.['minlength']) {
//         return `${this.capitalize(fieldName)} must be at least ${
//           field.errors['minlength'].requiredLength
//         } characters`;
//       }
//       if (field.errors?.['pattern']) {
//         switch (fieldName) {
//           case 'firstName':
//           case 'lastName':
//             return `${this.capitalize(fieldName)} must contain only letters`;
//           case 'phone':
//             return `Phone number must be a valid 10-digit Indian number starting with 6-9`;
//           case 'password':
//             return `Password must have 1 capital letter, 1 number, and 1 special character`;
//           default:
//             return 'Invalid input';
//         }
//       }
//       if (field.errors?.['email']) {
//         return 'Invalid email format';
//       }
//     }
//     if (
//       fieldName === 'confirmPassword' &&
//       this.registerForm.hasError('passwordsMismatch')
//     ) {
//       return 'Passwords do not match';
//     }
//     return '';
//   }

//   capitalize(text: string): string {
//     return text.charAt(0).toUpperCase() + text.slice(1);
//   }

//   goToLogin() {
//     this.router.navigate(['/login'], {
//       queryParams: { returnUrl: this.returnUrl },
//     });
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth-service.service';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  authService = inject(AuthService);
  navigationService = inject(NavigationService);
  submitted = false;
  returnUrl: string = '/login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.initForm();

    this.returnUrl = this.navigationService.getReturnUrl() || this.returnUrl;
    console.log('RegisterComponent: Initial returnUrl', this.returnUrl);
  }

  private initForm() {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/^[A-Za-z]+$/),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/^[A-Za-z]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.matchPasswords }
    );
  }

  private matchPasswords(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  registerFormSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log('Registration Form Data:', this.registerForm.value);
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (data) => {
          this.toastr.success('Registration successful!', 'Success');
          setTimeout(() => {
            console.log('Navigating to /login with returnUrl:', this.returnUrl);
            this.router.navigate(['/login'], {
              state: { returnUrl: this.returnUrl }, // Optional fallback
            });
          }, 2000);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          const errorMessage =
            error?.error?.message || 'An error occurred. Please try again.';
          this.toastr.error(errorMessage, 'Error');
          this.registerForm.controls['password'].reset();
          this.registerForm.controls['confirmPassword'].reset();
        },
      });
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Invalid Form');
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return (
      (field?.invalid && (field.touched || field.dirty || this.submitted)) ||
      (fieldName === 'confirmPassword' &&
        this.registerForm.hasError('passwordsMismatch'))
    );
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field) {
      if (field.errors?.['required']) {
        return `${this.capitalize(fieldName)} is required`;
      }
      if (field.errors?.['minlength']) {
        return `${this.capitalize(fieldName)} must be at least ${
          field.errors['minlength'].requiredLength
        } characters`;
      }
      if (field.errors?.['pattern']) {
        switch (fieldName) {
          case 'firstName':
          case 'lastName':
            return `${this.capitalize(fieldName)} must contain only letters`;
          case 'phone':
            return `Phone number must be a valid 10-digit Indian number starting with 6-9`;
          case 'password':
            return `Password must have 1 capital letter, 1 number, and 1 special character`;
          default:
            return 'Invalid input';
        }
      }
      if (field.errors?.['email']) {
        return 'Invalid email format';
      }
    }
    if (
      fieldName === 'confirmPassword' &&
      this.registerForm.hasError('passwordsMismatch')
    ) {
      return 'Passwords do not match';
    }
    return '';
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  goToLogin() {
    console.log('Navigating to login with returnUrl:', this.returnUrl);
    this.router.navigate(['/login'], {
      state: { returnUrl: this.returnUrl }, // Optional fallback
    });
  }
}