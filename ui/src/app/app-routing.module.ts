import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealsListComponent } from "./meals-list/meals-list.component";

const routes: Routes = [
    
     { path:'manage', component: MealsListComponent},
    { path:':id', component: MealsListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
    
    

export class AppRoutingModule { }