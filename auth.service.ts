import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  register(name: string, contactno:string, email: string, password: string) {
    return this.http.post(`${this.baseURL}/register`, { name,contactno, email, password });
  }

  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(`${this.baseURL}/checkEmailAvailability?email=${email}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseURL}/login`, { email, password });
  }

  getUserDetails(email: string):Observable<any> {
    return this.http.get(`${this.baseURL}/getUserDetails?email=${email}`);
  }

  updateUserProfile(email: string, name: string, contactno:string): Observable<any> {
    return this.http.put(`${this.baseURL}/updateProfile/${email}`, { name, contactno });
  }

  deleteAccount(email: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/deleteAccount/${email}`);
  }
  

}