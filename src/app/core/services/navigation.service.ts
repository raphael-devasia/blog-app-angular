import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private returnUrl: string | null = null;

  setReturnUrl(url: string) {
    this.returnUrl = url;
    console.log('NavigationService: Set returnUrl to', this.returnUrl);
  }

  getReturnUrl(): string | null {
    console.log('NavigationService: Get returnUrl', this.returnUrl);
    return this.returnUrl;
  }

  clearReturnUrl() {
    this.returnUrl = null;
    console.log('NavigationService: Cleared returnUrl');
  }
}
