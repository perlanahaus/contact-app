import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });

    // Ensure translations are loaded for the default language
    this.loadTranslations();

    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/register']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  private loadTranslations(): void {
    const defaultLang = 'en';
    this.translocoService.load(defaultLang).subscribe(
      () => {
        this.translocoService.setActiveLang(defaultLang);
      },
      (error) => {
        console.error('Error loading translations:', error);
      }
    );
  }
}
