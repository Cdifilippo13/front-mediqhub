import { Routes } from "@angular/router";
import { LayoutAuthComponent } from "./layout-auth/layout-auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const AUTH_ROUTES: Routes = [
    {
        path: '', component: LayoutAuthComponent, children: [
            {path: '', redirectTo:'login', pathMatch: 'full'},
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }      
        ]
    }
]