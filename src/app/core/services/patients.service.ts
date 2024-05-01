import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get<any>(
      'http://localhost:3000/v1/api/patient/getPatients'
    );
  }

  

}
