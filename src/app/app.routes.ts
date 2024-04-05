import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
    {
        path:'management',
        loadChildren:() => import('./management/management.routes').then( r => r.MANAGEMENT_ROUTES)
    },
    {
        path:'**',
        loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
    }
];
