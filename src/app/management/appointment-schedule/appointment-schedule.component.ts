import { Component, inject, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { AppointmentService } from '../../core/services/appointment-service.service';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarComponent],
  templateUrl: './appointment-schedule.component.html',
  styleUrl: './appointment-schedule.component.sass'
})
export class AppointmentScheduleComponent implements OnInit {

  
  doctors: any = []
  dateAppointment: Date = new Date()
  appointmentService = inject(AppointmentService);
  userService = inject(UserService);
  notificationService = inject(NotificationService);

  constructor(private ngZone: NgZone, private router: Router){}

  ngOnInit() {
    this.getDoctors();
    if( this.userService.getterUser.type === 1) {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/management/personal-diagnosis')
      });
    }
  }





  appointmentForm = new FormGroup(
    {
      date: new FormControl('', Validators.required),
      doctor: new FormControl('', Validators.required)
    }
  )

  getDoctors() {
    this.appointmentService.getDoctors().subscribe({
      next: (value) => {


        const newArrayDoctors = value.data.map((value: any) => {
          return {
            id: value.id,
            value: `${value.name}-${value.medicalSpeciality}`
          }
        })

        this.doctors = newArrayDoctors;
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('Termino el consumo');

      }
    })
  }


  dateAppointmentEvent(event: Date) {
    console.log(event);

    this.dateAppointment = event;

    const newDate = `${event.getMonth()}/${event.getDay()}/${event.getFullYear()}`


    this.appointmentForm.get('date')?.setValue(newDate)

    this.appointmentForm.updateValueAndValidity();


    console.log(this.appointmentForm.get('date')?.value)

  }


  handleSubmit() {
    console.log(this.appointmentForm.value)

    console.log()

    const user = this.userService.getterUser;

    let appointmentToInsert = {

      "citation": this.dateAppointment,
      "doctorId": this.appointmentForm.value.doctor,
      "patientId": String(user.id)

    }

    this.appointmentService.createAppointment(appointmentToInsert).subscribe({
      next: (value) => {
        this.notificationService.buildNotification(value.message, 'success');
        this.notificationService.showNotification()
        console.log(value)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('Termino el consumo');
        this.notificationService.closeNotification()
      }
    });


  }

}
