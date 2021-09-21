import { ManagerLayoutComponent } from './shared/layouts/manager-layout/manager-layout.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealsListComponent } from "./components/meals-list/meals-list.component";


const routes: Routes = [
    {path: 'manage', component: ManagerLayoutComponent},
    {path: '', component: ClientLayoutComponent, children: [
        { path: '', component: MealsListComponent },
        { path: ':id', component: MealsListComponent },
    ],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
    
    

export class AppRoutingModule {
    
}