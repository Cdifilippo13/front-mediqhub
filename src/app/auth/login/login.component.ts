import { Component, inject, NgZone } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/models/user';
import { LoginService } from '../../core/services/login.service';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  loginService = inject(LoginService);
  userService = inject(UserService);
  notificationService = inject(NotificationService);

  constructor(private ngZone: NgZone, private router: Router) { }

  loginForm = new FormGroup(
    {
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }
  )

  handleSubmit() {
    this.loginService.login(this.loginForm.value).subscribe(res => {

      console.log(res);


      if (res.status === 200) {
        let user: User;

        user = {
          email: res.data.email,
          name: res.data.name,
          type: res.data.type,
          id: res.data.id
        }

        this.userService.setUser(user);
        this.notificationService.buildNotification('Autotizado', 'success')
        this.notificationService.showNotification();


        this.ngZone.run(() => {
          this.router.navigateByUrl('/management')
        });


      }

    }
    )
  }

}
