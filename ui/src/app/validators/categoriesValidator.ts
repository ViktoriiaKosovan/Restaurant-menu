import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { CategoriesService } from "../services/categories.service";
import {map} from 'rxjs/operators';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";



@Injectable({ providedIn: 'root' })
  
export class exitingCategoryNameValidator implements AsyncValidator{
  constructor(private categoriesService: CategoriesService) {}
  validate (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.categoriesService.getAllCategories().pipe(
      map(categories => {
        const category=categories.find(category=>category.title==control.value.toUpperCase())
         return category ? { titleExists: true }:null
      })
    )}
}