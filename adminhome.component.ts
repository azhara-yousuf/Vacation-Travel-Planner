import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

  constructor(private adminService:AdminService){}

}
