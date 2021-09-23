import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Category {
    id?: string ,
    title: string,
    availability: boolean
}

@Injectable({providedIn: "root"})
export class CategoriesService {
    constructor(private http: HttpClient) { }
    
    getAllCategories(): Observable<Category[]> {
       return this.http.get<Category[]>('http://localhost:5000/api/category')
    }

    getCategoryById(id: string | undefined): Observable<Category> {
       return this.http.get<Category>(`http://localhost:5000/api/category/${id}`)
    }
     addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:5000/api/category', category)
     }
    updateCategory(category: Category): Observable<Category> {
        return this.http.patch<Category>('http://localhost:5000/api/category', category)
    }
}
