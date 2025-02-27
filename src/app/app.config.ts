import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(), provideToastr(), ]
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // provideHttpClient(withInterceptors([customInterceptor])),
    ReactiveFormsModule,
    FormsModule,
    provideAnimationsAsync(),
    MatDialog,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    // provideFirebaseApp(() => initializeApp({ ...environment.firebaseConfig })),

    AngularEditorModule,
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
