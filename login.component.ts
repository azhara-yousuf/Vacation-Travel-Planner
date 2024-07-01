import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string="";
  password: string="";
  isEmailValid: boolean = true;
  emailPresence: boolean=false;

  constructor(private authService: AuthService, private router: Router) {alert("Welcome Again!!")}

  onSubmit() {

    if(!this.email)
      {
        return;
      }
    
    this.authService.login(this.email, this.password)
      .subscribe(
        data => {
          console.log(data);
          alert('Login successful!');
          this.router.navigate(['/dashboard'], { queryParams: { email: this.email } });
        },
        error => {
          console.log(error);
          alert('Invalid email or password.');
        });
      }

      validateEmail() {
        console.log(this.emailPresence);
        this.emailPresence=this.email.trim() !== ''
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.isEmailValid = emailPattern.test(this.email);
        console.log(this.isEmailValid)
    }
}
