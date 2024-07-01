// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentUser = params['email'];
    });
  }

  navigateToMyProfile() {
    this.router.navigate(['/myprofile'], { queryParams: { email: this.currentUser } });
  }

  navigatrToMyHotelFill(){
    this.router.navigate(['/hotelfill'], { queryParams: { email: this.currentUser } });
  }

  navigatrToMyPackagesFill(){
    this.router.navigate(['/packagesfill'], { queryParams: { email: this.currentUser } });
  }


}
