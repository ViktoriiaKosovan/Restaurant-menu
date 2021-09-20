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
    availability: boolean
}

@Injectable({providedIn: "root"})
export class MealsService {
    constructor(private http: HttpClient) { }
    
    getAllMealsByCategory(id: string): Observable<Meals[]> {
       return this.http.get<Meals[]>(`http://localhost:5000/api/meal/${id}`)
    }
}