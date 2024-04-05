import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-diagnosis',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-diagnosis.component.html',
  styleUrl: './personal-diagnosis.component.sass'
})
export class PersonalDiagnosisComponent {

  ngOnInit(){
    
  }

  registerPersonalDiagnosisForm = new FormGroup(
    {
      diagnosis: new FormControl('', Validators.required),
      cie10: new FormControl('', Validators.required),
    }
  )


  handleSubmit(){

  }
}
