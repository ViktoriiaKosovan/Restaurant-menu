import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MealsListComponent } from "./components/meals-list/meals-list.component";

const routes: Routes = [
    
     { path:'', component: MealsListComponent},
    { path:':id', component: MealsListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
    
    

export class AppRoutingModule { }