import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { AppointmentService } from '../../core/services/appointment-service.service';
import { User } from '../../core/models/user';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-check-appointments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-appointments.component.html',
  styleUrl: './check-appointments.component.sass',
})
export class CheckAppointmentsComponent implements OnInit {
  userService = inject(UserService);
  appointmentService = inject(AppointmentService);
  notificationService = inject(NotificationService);

  appointmentEditing: any = null;
  data: any = [];

  editAppointmentForm = new FormGroup({
    newState: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getAppointment();
  }

  getAppointment(): void {
    const user: User = this.userService.getterUser;
    this.appointmentService
      .getAppointmentByUser(user.email, user.type.toString())
      .subscribe({
        next: (value) => {
          this.data = value.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Termino el consumo');
        },
      });
  }

  handleStatus(status: number) {
    const DEFAULT_VALUES: any = Object.freeze({
      1: 'PENDIENTE',
      2: 'RECHAZADA',
      3: 'ACEPTADA',
      4: 'CANCELADA',
    });
    return DEFAULT_VALUES[status];
  }

  handleEdit(appointment: any) {
    console.log({ appointment });
    console.log(this.data);
    console.log(this.appointmentEditing);
    this.appointmentEditing = appointment;
  }

  handleSubmit() {
    if (this.editAppointmentForm.valid) {
      const newState = this.editAppointmentForm.get('newState')?.value;
      const appointmentToInsert = {
        newState,
        ...this.appointmentEditing,
      };

      this.appointmentService.updateAppointment(appointmentToInsert).subscribe({
        next: (value) => {
          this.getAppointment();
          this.notificationService.buildNotification(value.message, 'success');
          this.notificationService.showNotification();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.notificationService.closeNotification();
        },
      });
    }
  }
}
