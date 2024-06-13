import { Component, inject } from '@angular/core';
import cie10List from '../../core/constants/codes.json';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonalDiagnosisService } from '../../core/services/personal-diagnosis.service';
import { UserService } from '../../core/services/user.service';
import { PatientsService } from '../../core/services/patients.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-personal-diagnosis',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-diagnosis.component.html',
  styleUrl: './personal-diagnosis.component.sass',
})
export class PersonalDiagnosisComponent {
  patients: any = [];
  codeNotExist: boolean = true;
  userService = inject(UserService);
  patientsService = inject(PatientsService);
  personalDiagnosisService = inject(PersonalDiagnosisService);
  notificationService = inject(NotificationService);
  registerPersonalDiagnosisForm = new FormGroup({
    diagnosis: new FormControl('', Validators.required),
    cie10: new FormControl('', Validators.required),
    patient: new FormControl('', Validators.required),
  });

  ngOnInit() {

    this.patientsService.getPatients().subscribe({
      next: (value) => {
        this.patients = value.data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    console.log(this.userService.getterUser);
    

    if (this.userService.getterUser.type === 2) {
      this.personalDiagnosisService.getPersonalDiagnosisByUserId( this.userService.getterUser.email )
      .subscribe({
        next: (personalDiagnosis) => {
          console.log(personalDiagnosis.data[0])
          this.registerPersonalDiagnosisForm.get('diagnosis')?.setValue(personalDiagnosis.data[0].diagnosis);
          this.registerPersonalDiagnosisForm.get('cie10')?.setValue(personalDiagnosis.data[0].cie10);
          // this.registerPersonalDiagnosisForm.get('patient')?.setValue();
        }
      })
      return;
    }

  }

  handleSubmit() {
    const codeSended = this.registerPersonalDiagnosisForm.get('cie10')?.value;
    if (!codeSended) return;

    console.log(codeSended);


    
    const codeExists = cie10List.find((cie10) => cie10.code === codeSended);

/*   const codeExists = cie10List.some((cie10) => {




      cie10.code === codeSended

      
      let searchIndex = 0;
      for (let i = 0; i < cie10.code.length; i++) {
        if (cie10.code[i] === codeSended[searchIndex]) {
          searchIndex++;
          if (searchIndex === codeSended.length) {
            console.log(cie10);
            this.registerPersonalDiagnosisForm
              .get('cie10')
              ?.setValue(cie10.code);
            this.registerPersonalDiagnosisForm.updateValueAndValidity();
            return true;
          }
        }
      }
      return false; 
    }); */
 
    console.log(codeExists);
    

    if (!codeExists) {
      this.codeNotExist = true;
      this.registerPersonalDiagnosisForm.get('cie10')?.setValue(' ');
      this.registerPersonalDiagnosisForm.updateValueAndValidity();
      return;
    }

    this.codeNotExist = false;

    const toInsert = {
      patientId: this.registerPersonalDiagnosisForm.get('patient')?.value,
      diagnosis: this.registerPersonalDiagnosisForm.get('diagnosis')?.value,
      cie10: this.registerPersonalDiagnosisForm.get('cie10')?.value,
      doctorId: this.userService.getterUser.id,
    };

    console.log(toInsert);

    this.personalDiagnosisService.createPersonalDiagnosis(toInsert).subscribe({
      next: (value) => {
        this.notificationService.buildNotification(
          'Historia clínica agregada correctamente',
          'success'
        );
        this.notificationService.showNotification();
      },
    });
  }
}
