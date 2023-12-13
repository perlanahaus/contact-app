// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully.');
      this.router.navigate(['/contacts']);
    } catch (error) {
      console.error('Error signing up:', error);
      this.router.navigate(['/error']);
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully.');
      this.router.navigate(['/contacts']);
    } catch (error) {
      console.error('Error signing in:', error);
      this.router.navigate(['/error']);
    }
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/signin']); // Redirect to signin after logout
    });
  }

  getCurrentUser(): Observable<any | null> {
    return this.auth.user;
  }
}
