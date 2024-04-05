import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }


    createUser(body:any){
        return this.http.post('http://localhost:3000/v1/api/user/createUser',body)
    }

}