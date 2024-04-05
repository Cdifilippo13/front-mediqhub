import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  behaviorSubject = new BehaviorSubject({
    message: '',
    type: 'normal'
  })

  show: boolean = false;



  constructor() { }


  buildNotification(message: string, type: string) {

    this.behaviorSubject.next({
      message,
      type
    })

  }

  showNotification() : void{
    this.show = true;
  }

  closeNotification() {
    this.show = false;

    console.log(this.show);
    
  }



}
