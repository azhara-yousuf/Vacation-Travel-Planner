import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}
  alogin(aid: string, password: string) {
    return this.http.post(`${this.baseURL}/alogin`, { aid, password });
  }
}
