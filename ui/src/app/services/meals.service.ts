import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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

@Injectable({providedIn: "root"})
export class MealsService {
    constructor(private http: HttpClient) { }
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
}