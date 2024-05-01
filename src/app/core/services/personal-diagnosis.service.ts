import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalDiagnosisService {

  constructor(private http: HttpClient) { }

  createPersonalDiagnosis(body: any){
    return this.http.post<any>('http://localhost:3000/v1/api/clinicHistory/createClinicHistory', body)
  }

  getPersonalDiagnosisByUserId( userId: string){
    return this.http.get<any>(`http://localhost:3000/v1/api/clinicHistory/getClinicHistoryByPatient?userId=${userId}`)
  }
}
