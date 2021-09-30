import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/client/category/category.component';
import { AppComponent } from './app.component';
import { MealsListComponent } from './components/client/meals-list/meals-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ManageComponent } from './components/manager/manage-header/manage-header.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { ManagerLayoutComponent } from './shared/layouts/manager-layout/manager-layout.component';
import { ManageCategoriesComponent } from './components/manager/manage-categories/manage-categories.component';
import { ManageMealsComponent } from './components/manager/manage-meals/manage-meals.component';
import { ManageInfoComponent } from './components/manager/manage-info/manage-info.component';
import { FilterPipeCategory } from './pipes/filterCategory.pipe';
import { FilterPipeMeal } from './pipes/filterMeal.pipe';
import { InfoComponent } from './components/client/info/info.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    MealsListComponent,
    InfoComponent,
    ManageComponent,
    ClientLayoutComponent,
    ManagerLayoutComponent,
    ManageCategoriesComponent,
    ManageMealsComponent,
    ManageInfoComponent,
    FilterPipeCategory,
    FilterPipeMeal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
