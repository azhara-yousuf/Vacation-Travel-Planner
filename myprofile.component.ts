import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit {

  
  show = false;
  email: string = "";
  currentUser: any = {};
  updatedName: string = "";
  updatedContactNo: string = "";
  

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    console.log("HLO"+this.show);
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      this.email = params['email'];
      console.log('Email:', this.email);
    });
    const currentUserEmail = this.email;
    if (currentUserEmail) {
      this.authService.getUserDetails(currentUserEmail)
          .subscribe(
            (data: any) => {
              console.log(data);
              this.currentUser = data;
            },
            (error) => {
              console.error(error);
            }
          );
    }
    console.log("Finished");
    
  }

  openpopup(){
    this.show=true;
  }

  closepopup(){
    this.show=false;
  }

  OnSubmit(){
    this.authService.updateUserProfile(this.email, this.updatedName, this.updatedContactNo)
      .subscribe(
        (data: any) => {
          console.log('Profile updated successfully:', data);
          this.currentUser.name = this.updatedName;
          this.currentUser.contactno = this.updatedContactNo;
          this.closepopup();
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
  }

  deleteAccount() {
    const confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.authService.deleteAccount(this.email)
        .subscribe(
          () => {
            alert('Account deleted successfully.');
            window.location.href='';
          },
          (error) => {
            console.error(error);
            alert('Error deleting account.');
          }
        );
    }
  }


}
