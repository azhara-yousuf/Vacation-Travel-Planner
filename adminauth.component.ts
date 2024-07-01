import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminauth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminauth.component.html',
  styleUrl: './adminauth.component.css'
})
export class AdminauthComponent {

  aid:string="";
  password:string="";
  constructor(private adminService:AdminService, private route: ActivatedRoute, private router: Router){alert('Specify your credential!!')}
  onSubmit() {

    if(!this.aid || !this.password)
      {
        alert("Enter both details")
        return;
      }

      this.adminService.alogin(this.aid, this.password)
      .subscribe(
        data => {
          console.log(data);
          alert('Login successful!');
          localStorage.setItem('currentUser', this.aid);
          this.router.navigate(['/adminhome', this.aid]);
        },
        error => {
          console.log(error);
          alert('Invalid email or password.');
        });
  }
}
