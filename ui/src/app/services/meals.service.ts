import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "./categories.service";

export interface Meals {
    id?: string,
    img: string,
    name:  string,
    description: string,
    weight: string,
    price: string,
   availability: boolean,
   categoryId?: string
}
export interface Availability {
    id?: string,
   availability: boolean,
 
}


@Injectable({providedIn: "root"})
export class MealsService {

   private _meals = new BehaviorSubject<Meals[]>([]);
   
   

   constructor(private http: HttpClient) {
      this.getAllMealsInitialize();
   }
   
    private getAllMealsInitialize(): void {
    this.http.get<Meals[]>(`http://localhost:5000/api/meals/`)
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
       return this.http.get<Meals>(`http://localhost:5000/api/meals/${id}`)
    }

    getAllMealsByCategory(id: string): Observable<Meals[]> {
       return this.http.get<Meals[]>(`http://localhost:5000/api/meals/category/${id}`)
    }
    getAllMeals(): Observable<Meals[]> {
       return this.http.get<Meals[]>(`http://localhost:5000/api/meals/`)
    }
   
   addMeal(meal: Meals): Observable<Meals> {
    return this.http.post<Meals>('http://localhost:5000/api/meals', meal)
   }
   
   updateMeal(meal: Meals): Observable<Meals> {
        return this.http.patch<Meals>('http://localhost:5000/api/meals', meal)
   }
    updateMealAvailability(availability: Availability): Observable<Availability> {
        return this.http.patch<Availability>('http://localhost:5000/api/meals/availability', availability)
   }

    deleteMeal(id: string | undefined): Observable<string> {
       return this.http.delete<string>(`http://localhost:5000/api/meals/${id}`)
    }
}