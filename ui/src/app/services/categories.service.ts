import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Availability } from "./meals.service";
import { baseCategoryUrl,getAllAvailableCategories, updateCategoryAvailability } from "../constants/categoriesApiUrls";

export interface Category {
    id?: string ,
    title: string,
    availability: boolean
}

@Injectable({providedIn: "root"})
export class CategoriesService {
    constructor(private http: HttpClient) { }

     getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(baseCategoryUrl)
    }
    
    getAvailableCategories(): Observable<Category[]> {
       return this.http.get<Category[]>(getAllAvailableCategories)
    }

    getCategoryById(id: string | undefined): Observable<Category> {
       return this.http.get<Category>(`${baseCategoryUrl}/${id}`)
    }
     addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(baseCategoryUrl, category)
     }
    updateCategory(category: Category): Observable<Category> {
        return this.http.patch<Category>(baseCategoryUrl, category)
    }
     updateCategoryAvailability(availability: Availability): Observable<Availability> {
        return this.http.patch<Availability>(updateCategoryAvailability, availability)
   }

}


