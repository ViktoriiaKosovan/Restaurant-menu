import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { baseMealsUrl, getMealsByCategory, updateMealAvailability } from "../constants/mealsApiUrls";
import { Availability } from "../shared/layouts/interfaces/availabilityInterface";
import { Meals } from "../shared/layouts/interfaces/mealsInterfaces";



@Injectable({providedIn: "root"})
export class MealsService {

   private _meals = new BehaviorSubject<Meals[]>([]);
   
   

   constructor(private http: HttpClient) {
      this.getAllMealsInitialize();
   }
   
    private getAllMealsInitialize(): void {
    this.http.get<Meals[]>(baseMealsUrl)
      .subscribe((data: Meals[]) => {
        this._meals.next(data);
      });
    }
   
   getMeals() {
      return this._meals;
   }

   updateMeals(data:Meals[]) {
       this._meals.next(data)
   }


    getMealById(id: string | undefined): Observable<Meals> {
       return this.http.get<Meals>(`${baseMealsUrl}/${id}`)
    }

    getAllMealsByCategory(id: string): Observable<Meals[]> {
       return this.http.get<Meals[]>(`${getMealsByCategory}/${id}`)
    }
    getAllMeals(): Observable<Meals[]> {
       return this.http.get<Meals[]>(baseMealsUrl)
    }
   
   addMeal(meal: Meals): Observable<Meals> {
    return this.http.post<Meals>(baseMealsUrl, meal)
   }
   
   updateMeal(meal: Meals): Observable<Meals> {
        return this.http.patch<Meals>(baseMealsUrl, meal)
   }
    updateMealAvailability(availability: Availability): Observable<Availability> {
        return this.http.patch<Availability>(updateMealAvailability, availability)
   }

    deleteMeal(id: string | undefined): Observable<string> {
       return this.http.delete<string>(`${baseMealsUrl}/${id}`)
    }
}