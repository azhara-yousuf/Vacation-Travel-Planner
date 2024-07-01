import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelfillComponent } from './hotelfill/hotelfill.component';
import { HotelsearchComponent } from './hotelsearch/hotelsearch.component';
import { CommonModule } from '@angular/common';
import { HotelpageComponent } from './hotelpage/hotelpage.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminauthComponent } from './adminauth/adminauth.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminhotelComponent } from './adminhotel/adminhotel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Puhotelimg1Component } from './puhotelimg1/puhotelimg1.component';
import { PackagesfillComponent } from './packagesfill/packagesfill.component';
import { AddhotelComponent } from './addhotel/addhotel.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'myprofile',component:MyprofileComponent},
    {path:'payment',component:PaymentComponent},
    {path:'changepassword',component:ChangepwdComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'hotelfill',component:HotelfillComponent},
    {path:'hotelsearch',component:HotelsearchComponent},
    {path:'hotelpage',component:HotelpageComponent},
    {path:'adminauth',component:AdminauthComponent},
    {path:'adminhome/:id',component:AdminhomeComponent},
    {path:'adminhotel',component:AdminhotelComponent},
    {path:'puhotelimg1',component:Puhotelimg1Component},
    {path:'packagesfill',component:PackagesfillComponent},
    {path:'addhotel',component:AddhotelComponent}
];

@NgModule(
    {
        imports:[RouterModule.forRoot(routes), FormsModule, HttpClientModule, CommonModule, MatDatepickerModule,
            MatNativeDateModule,MatDialogModule],
        exports:[RouterModule]
    }
)
export class AppRoutingModule{}