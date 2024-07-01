import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-packagesfill',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './packagesfill.component.html',
  styleUrl: './packagesfill.component.css'
})
export class PackagesfillComponent implements OnInit{

  currentUser: string = '';
  formData = {
    from: '',
    to: '',
    ddate: '',
    memcount: 0
  };
  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentUser = params['email'];
    });
  }

  onSubmit(form: NgForm){

    if(!this.formData.from || !this.formData.to || !this.formData.ddate || !this.formData.memcount)
    {
      alert("Fill All Details");
      return;
    }
    const formDataWithUser = { ...form.value, email: this.currentUser};
    this.router.navigate(['/hotelsearch'], {
      queryParams: formDataWithUser
    });
    console.log("Form Data:", formDataWithUser);
  }

  navigateToMyProfile() {
    this.router.navigate(['/myprofile'], { queryParams: { email: this.currentUser } });
  }

  onKeyPress1(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const alphabetPattern = /[a-zA-Z]/; 
    if (!alphabetPattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  
  getToday(): string {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
    console.log(formattedDate)
  }

  navigatrToMyHotelFill(){
    this.router.navigate(['/hotelfill'], { queryParams: { email: this.currentUser } });
  }

  navigatrToMyPackagesFill(){
    this.router.navigate(['/packagesfill'], { queryParams: { email: this.currentUser } });
  }

}
