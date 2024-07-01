import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  host: {ngSkipHydration: 'true'},
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string="";
  contactno: string="";
  email: string="";
  cpwd: string="";
  password: string = '';
  hasUppercase: boolean = false;
  hasLowercase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;
  hasLength:boolean=false;
  confirmpwd:boolean=false;
  namePresence: boolean = false;
  cnoPresence:boolean=false;
  isEmailValid: boolean = true;
  emailPresence: boolean=false;
  constructor(private authService: AuthService) {}

  onSubmit() {

    if(this.confirmpwd || !this.namePresence || !this.emailPresence || !this.cnoPresence || !this.hasLength || !this.hasUppercase || !this.hasLowercase || !this.hasNumber || !this.hasSpecialChar || !this.isEmailValid || this.contactno.length!=10)
      {
        alert("Fill mentioned details!!")
        return;
      }

    this.authService.checkEmailAvailability(this.email).subscribe(
      (data: any) => {
        if (!data.available) {
          alert("Email is already registered");
        } else {
          this.authService.register(this.name, this.contactno, this.email, this.password).subscribe(
            () => {
              alert("User registered successfully!");
              window.location.href = '/login';
            },
            (error) => {
              console.error(error);
              alert("Error registering user. Please try again.");
            }
          );
        }
      },
      (error) => {
        console.error(error);
        alert("Error checking email availability. Please try again.");
      }
    );
  }

 

nameInput() {
    this.namePresence = this.name.trim() !== '';
}

cnoInput() {
  this.cnoPresence = this.contactno.trim() !== '';
}

  confirmPasswordInput() {
    this.confirmpwd = this.password !== this.cpwd && this.cpwd.trim() !== '';
}

  onPasswordInput() {
      this.hasUppercase = /[A-Z]/.test(this.password);
      this.hasLowercase = /[a-z]/.test(this.password);
      this.hasNumber = /\d/.test(this.password);
      this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
      this.hasLength = this.password.length>=8;
  }

  validateEmail() {
    this.emailPresence=this.email.trim() !== ''
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isEmailValid = emailPattern.test(this.email);
    console.log(this.isEmailValid)
}

  onKeyPress1(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const alphabetPattern = /[a-zA-Z]/; 
    if (!alphabetPattern.test(inputChar)) {
        event.preventDefault();
    }
}

  onKeyPress(event: KeyboardEvent) {
    if (isNaN(Number(event.key)) || (event.target as HTMLInputElement).value.length >= 10) {
        event.preventDefault();
    }
}
  
}
