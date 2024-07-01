import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hotelfill',
  standalone: true,
  imports: [FormsModule],
  host: {ngSkipHydration: 'true'},
  templateUrl: './hotelfill.component.html',
  styleUrl: './hotelfill.component.css'
})
export class HotelfillComponent implements OnInit{

  currentUser: string = '';
  formData = {
    city: '',
    checkIn: '',
    checkOut: '',
    rooms: 0,
    costPerNight: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentUser = params['email'];
    });
  }

  onSubmit(form: NgForm){

    if(!this.formData.city || !this.formData.checkIn || !this.formData.checkOut || !this.formData.costPerNight || !this.formData.rooms)
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

  navigateToMyHotelFill(){
    this.router.navigate(['/hotelfill'], { queryParams: { email: this.currentUser } });
  }

  onKeyPress1(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const alphabetPattern = /[a-zA-Z]/; 
    if (!alphabetPattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  minCheckOutDate: string=''; // Variable to hold the minimum check-out date

  getToday(): string {
    const today = new Date();
    // Format the date as yyyy-MM-dd (required by the 'date' input type)
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }

  updateCheckOutMin(): void {
    // Set the minimum check-out date to the selected check-in date
    this.minCheckOutDate = this.formData.checkIn;
  }


}
