import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-management-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './management-layout.component.html',
  styleUrl: './management-layout.component.sass',
})
export class ManagementLayoutComponent implements OnInit {
  userService = inject(UserService);
  showAppointmentSchedule: boolean = false;

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit() {
    const user = this.userService.getterUser;
    const { type, id } = user;
    if (!id) {
      this.goTo('/')
    }

    if (type === 1) return;
    this.showAppointmentSchedule = true;
  }

  goTo(route: string) {
    this.ngZone.run(() => {
      this.router.navigateByUrl(route);
    });
  }
}
