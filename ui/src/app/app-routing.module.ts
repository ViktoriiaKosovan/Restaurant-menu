import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManagerLayoutComponent } from './shared/layouts/manager-layout/manager-layout.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { MealsListComponent } from "./client/meals-list/meals-list.component";
import { ManageCategoriesComponent } from './manager/manage-categories/manage-categories.component';
import { ManageMealsComponent } from './manager/manage-meals/manage-meals.component';
import { ManageInfoComponent } from './manager/manage-info/manage-info.component';


const routes: Routes = [
    {
        path: 'manage', component: ManagerLayoutComponent, children: [
            // {path:"manage", redirectTo:"/categories", pathMatch:"prefix"},
             { path: 'categories', component: ManageCategoriesComponent },
            { path: 'meals', component: ManageMealsComponent },
        { path: 'info', component: ManageInfoComponent },
    ],
    },
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