import { Routes } from "@angular/router";
import { AppointmentScheduleComponent } from "./appointment-schedule/appointment-schedule.component";
import { CheckAppointmentsComponent } from "./check-appointments/check-appointments.component";
import { ManagementLayoutComponent } from "./management-layout/management-layout.component";
import { PersonalDiagnosisComponent } from "./personal-diagnosis/personal-diagnosis.component";

export const MANAGEMENT_ROUTES: Routes = [
    {
        path: '', component: ManagementLayoutComponent, children: [
            {
                path: '',
                redirectTo: 'appointment-schedule',
                pathMatch: 'full'
            },
            { path: 'appointment-schedule', component: AppointmentScheduleComponent },
            { path: 'check-appointment', component: CheckAppointmentsComponent },
            { path: 'personal-diagnosis', component: PersonalDiagnosisComponent }

        ]
    },

]