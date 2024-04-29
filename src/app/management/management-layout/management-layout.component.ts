import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-management-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './management-layout.component.html',
  styleUrl: './management-layout.component.sass'
})
export class ManagementLayoutComponent implements OnInit{

  userService = inject(UserService);
  showAppointmentSchedule: boolean = false;
  

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit(){
    const user: User = this.userService.getterUser;
    if(user.type === 1) return; 
    this.showAppointmentSchedule = true;
  }

  goTo(route: string) {
    this.ngZone.run(() => {
      this.router.navigateByUrl(route)
    });
  }



}
