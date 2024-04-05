import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user:User = {} as User;

  constructor() { }


  setUser(user:User){
    this.user = user;
  }

  get getterUser(){
    return this.user;
  }

  
}
