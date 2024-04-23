import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { MedicosComponent } from "./components/medicos/medicos.component";
import { PacientesComponent } from "./components/pacientes/pacientes.component";
import { AddMedicoComponent } from "./components/medicos/add-medico/add-medico.component";
import { PersonasComponent } from "./components/personas/personas.component"; 
import { ReportePersonasComponent } from "./components/personas/reporte-personas/reporte-personas.component";


export const AUTH_DASHBOARD: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent},
            // MEDICOS
            { path: 'medicos', component: MedicosComponent},
            { path: 'add-medico', component: AddMedicoComponent},
            { path: 'update/:idMedico', component: AddMedicoComponent},
            //PACIENTES
            { path: 'pacientes', component: PacientesComponent},
            //PERSONAS
            { path: 'personas', component: PersonasComponent}, 
            { path: 'reporte-personas', component: ReportePersonasComponent}, 
        ],
    }
]