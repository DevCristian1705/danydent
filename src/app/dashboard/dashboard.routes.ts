import { Routes } from "@angular/router"; 
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { MedicosComponent } from "./components/medicos/medicos.component";
import { PacientesComponent } from "./components/pacientes/pacientes.component";
import { AddMedicoComponent } from "./components/medicos/add-medico/add-medico.component";
 

export const AUTH_DASHBOARD: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent}, 
            { path: 'medicos', component: MedicosComponent}, 
            { path: 'add-medico', component: AddMedicoComponent}, 
            { path: 'update/:idMedico', component: AddMedicoComponent}, 
            { path: 'pacientes', component: PacientesComponent}, 
        ], 
    } 
]