import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HotelService } from '../hotel.service';
@Component({
  selector: 'app-addhotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addhotel.component.html',
  styleUrl: './addhotel.component.css'
})
export class AddhotelComponent {
  constructor(
    public dialogRef: MatDialogRef<AddhotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private hotelService: HotelService
  ) { }

  hotel: any = {
    name: '',
    features: '',
    desc: '',
    location: '',
    rating: '',
    price: '',
    roomcount: 0,
    img: {
      data: [],
      contentType: ''
    },
    img1: {
      data: [],
      contentType: ''
    },
    img2: {
      data: [],
      contentType: ''
    },
    img3: {
      data: [],
      contentType: ''
    }
  };

  imgData: string | ArrayBuffer | null="";
  img1Data: string | ArrayBuffer | null="";
  img2Data: string | ArrayBuffer | null="";
  img3Data: string | ArrayBuffer | null="";

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
  
  getDataFromDataUri(dataUri: string): number[] {
    const base64 = dataUri.split(',')[1];
    const bytes = atob(base64).split('').map(char => char.charCodeAt(0));
    return bytes;
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log("jihi "+file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUri = reader.result as string;
        const imageData = this.getDataFromDataUri(dataUri);
        this.hotel.img = {
          data: Array.from(imageData),
          contentType: "image/jpeg"
        };
        this.imgData = dataUri;
      };
    }
  }

  onFileSelected1(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUri = reader.result as string;
        const imageData = this.getDataFromDataUri(dataUri);
        this.hotel.img1 = {
          data: Array.from(imageData), 
          contentType: "image/jpeg" 
        };
        this.img1Data = dataUri;
      };
    }
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUri = reader.result as string;
        const imageData = this.getDataFromDataUri(dataUri);
        this.hotel.img2 = {
          data: Array.from(imageData), 
          contentType: "image/jpeg" 
        };
        this.img2Data = dataUri;
      };
    }
  }
  onFileSelected3(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUri = reader.result as string;
        const imageData = this.getDataFromDataUri(dataUri);
        this.hotel.img3 = {
          data: Array.from(imageData), 
          contentType: "image/jpeg"
        };
        this.img3Data = dataUri;
      };
    }
  }
  saveChanges() {
    const hdata = {
      name: this.hotel.name,
      features: this.hotel.features,
      desc: this.hotel.desc,
      location: this.hotel.location,
      rating: this.hotel.rating,
      price: this.hotel.price,
      roomcount: this.hotel.roomcount.toString(),
      img: this.hotel.img,
      img1: this.hotel.img1,
      img2: this.hotel.img2,
      img3: this.hotel.img3
    };
    if(this.hotel)
      {
      this.hotelService.addHotelDetails(hdata)
      .subscribe(
        (hoteldata: any) => {
          console.log('Added successfully:', hoteldata);
          this.hotel=hoteldata;
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
    alert('Hotel added successfully.');
    this.dialogRef.close();
    window.location.href='/adminhotel';
    
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
