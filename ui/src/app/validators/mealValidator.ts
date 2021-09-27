import { MealsService } from 'src/app/services/meals.service';
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import {map} from 'rxjs/operators';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";



@Injectable({ providedIn: 'root' })
  
export class exitingMealNameValidator implements AsyncValidator{
  constructor(private mealsService: MealsService) {}
  validate (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.mealsService.getAllMeals().pipe(
      map(meals => {
        const meal=meals.find(meal=>meal.name.toLowerCase()==control.value.toLowerCase())
         return meal ? { titleExists: true }:null
      })
    )}
}