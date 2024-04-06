import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthComponent } from "./auth.component";

export const AUTH_ROUTES: Routes= [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent},
            { path: 'registro', component: RegisterComponent}
        ], 
    } 
]