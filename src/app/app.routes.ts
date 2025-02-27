import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ListComponent } from './features/blog/list/list.component';
import { SinglePostComponent } from './features/blog/single-post/single-post.component';
import { CreatePostComponent } from './features/blog/create-post/create-post.component';
import { UpdatePostComponent } from './features/blog/update-post/update-post.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'blogs', component: ListComponent },
  { path: 'my-posts', component: ListComponent },
  { path: 'blog/:postId', component: SinglePostComponent },
  {
    path: 'write-post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-post/:id',
    component: UpdatePostComponent,
    canActivate: [authGuard],
  },
];
