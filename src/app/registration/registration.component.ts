import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Password and Confirm Password do not match.');
      return;
    }

    // Call the signUp method from the AuthService
    this.authService.signUp(this.email, this.password);
  }
}
