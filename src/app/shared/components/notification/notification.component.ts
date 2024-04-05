import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.sass'
})
export class NotificationComponent implements OnInit{

  message: string = '';
  type: string = 'normal';
 

  notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.getValuesToService()
  }

  getValuesToService(){
    this.notificationService.behaviorSubject.subscribe(res => {
      this.message = res.message
      this.type = res.type
    })
  }

  closeNotification(){
    this.notificationService.closeNotification();
  }


 

  




}
