import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './client/category/category.component';
import { HeaderComponent } from './client/header/header.component';
import { AppComponent } from './app.component';
import { MealsListComponent } from './client/meals-list/meals-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './client/footer/footer.component';
import { ManageComponent } from './manager/manage-header/manage-header.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { ManagerLayoutComponent } from './shared/layouts/manager-layout/manager-layout.component';
import { ManageCategoriesComponent } from './manager/manage-categories/manage-categories.component';
import { ManageMealsComponent } from './manager/manage-meals/manage-meals.component';
import { ManageInfoComponent } from './manager/manage-info/manage-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    MealsListComponent,
    FooterComponent,
    ManageComponent,
    ClientLayoutComponent,
    ManagerLayoutComponent,
    ManageCategoriesComponent,
    ManageMealsComponent,
    ManageInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
