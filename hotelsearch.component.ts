import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotelsearch',
  templateUrl: './hotelsearch.component.html',
  standalone: true,
  imports: [FormsModule,CommonModule],
  styleUrls: ['./hotelsearch.component.css']
})
export class HotelsearchComponent implements OnInit {
  currentUser: string = "";
  formData: any;
  hotelDetails: any;
  selectedRatings: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentUser = params['email'];
      this.formData = params;
    });

    this.getAllHotelDetails();
  }

  viewHotelDetails(hid: any) {
    this.router.navigate(['/hotelpage'], {
      queryParams: {
        email: this.currentUser,
        checkIn: this.formData.checkIn,
        checkOut: this.formData.checkOut,
        rooms: this.formData.rooms,
        hid : hid,
      }
    });
  }

  navigateToMyProfile() {
    this.router.navigate(['/myprofile'], { queryParams: { email: this.currentUser } });
  }

  getAllHotelDetails() {
    this.hotelService.getAllHotelDetails().subscribe(
      (data) => {
        this.filterHotelsByCity(data);
      },
      (error) => {
        console.error('Error fetching hotel details:', error);
      }
    );
  }

  filterHotelsByCity(data: any[]) {
    const preferredCityHotels = data.filter((hotel: any) => hotel.location.includes(this.formData.city));
const otherHotels = data.filter((hotel: any) => !hotel.location.includes(this.formData.city));

    this.hotelDetails = [...preferredCityHotels, ...otherHotels];
  }

  getHotelImageSrc(image: any): string {
    if (image && image.data && image.contentType) {
      const bufferArray = new Uint8Array(image.data.data);
      const array = Array.from(bufferArray);
      const base64Image = btoa(String.fromCharCode.apply(null, array));
      return `data:${image.contentType};base64,${base64Image}`;
    } else {
      return 'assets/default-hotel-image.png';
    }
  }

  navigateToMyHotelFill(){
    this.router.navigate(['/hotelfill'], { queryParams: { email: this.currentUser } });
  }

  filterHotelsByRating() {
    if (this.selectedRatings.length > 0) {
      this.hotelDetails = this.hotelDetails.filter((hotel: any) => {
        const ratingNumber = parseFloat(hotel.rating.split('/')[0]);
        return this.selectedRatings.some(selectedRating => ratingNumber >= selectedRating);
      });
    }
    else {
      this.hotelService.getAllHotelDetails().subscribe(
        (data) => {
          this.hotelDetails = data;
        },
        (error) => {
          console.error('Error fetching hotel details:', error);
        }
      );
    }
  }


  onRatingFilterChange(event: any, rating: number) {
    if (event.target.checked) {
      this.selectedRatings.push(rating);
    } else {
      const index = this.selectedRatings.indexOf(rating);
      if (index !== -1) {
        this.selectedRatings.splice(index, 1);
      }
    }
    this.filterHotelsByRating();
  }

}
