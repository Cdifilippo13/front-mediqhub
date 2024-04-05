import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    this.checkSpecialtyValidation()
  }
  authService = inject(AuthService);

  registerForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      specialty: new FormControl('')
    }
  )


  checkSpecialtyValidation() {
    this.registerForm.get('type')?.valueChanges.subscribe((value) => {
      const specialtyControl = this.registerForm.get('specialty');
      const validators = [Validators.required];
      if (value == '1') {
        specialtyControl?.setValidators(validators)
      } else {
        specialtyControl?.clearValidators();
      }

      specialtyControl?.updateValueAndValidity();

    })
  }


  handleSubmit() {

    this.authService.createUser(this.registerForm.value).subscribe(res => console.log(res))

  }

}
