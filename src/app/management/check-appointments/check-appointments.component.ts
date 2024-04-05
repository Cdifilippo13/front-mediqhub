import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-appointments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-appointments.component.html',
  styleUrl: './check-appointments.component.sass'
})
export class CheckAppointmentsComponent {
  editAppointmentForm = new FormGroup(
    {
      newState: new FormControl('', Validators.required),
     
    }
  )

  handleSubmit(){

  }
}
