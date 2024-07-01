import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  currentUser: string = "";
  rooms: string = "";
  checkIn: string = "";
  checkOut: string = "";
  hname:string="";
  hloc:string="";
  price: string="";
  fprice:number=0.0;
  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentUser = params['email'];
      this.rooms = params['rooms'];
      this.checkIn = params['checkIn'];
      this.checkOut = params['checkOut'];
      this.hname=params['hname'];
      this.hloc = params['hloc'];
      this.price = params['price'];
    });
  }

  generatePDF() {
    this.fprice = parseFloat(this.price.replace('Rs. ', '')) * parseInt(this.rooms);
    const content = `
    ...........................Invoice...................................
      Customer Mail   :  ${this.currentUser}
      Rooms Booked    :  ${this.rooms}
      Check-in Date   :  ${this.checkIn}
      Check-out Date  :  ${this.checkOut}
    .........................Hotel Details...............................
      Name      :  ${this.hname}
      Location  :  ${this.hloc}
      Price     :  Rs. ${this.fprice}
    ......................................................................
      Thank you for your Bookings..Visit Again...
    ......................................................................
  `;

  const pdf = new jspdf.jsPDF();
  pdf.text(content, 10, 10);
  pdf.save('payment-details.pdf');
  }
}
