import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Category {
    id?: string,
    title: string,
    availability: boolean
}

@Injectable({providedIn: "root"})
export class HeaderService {
    constructor(private http: HttpClient) { }
    
    getAllCategories(): Observable<Category[]> {
       return this.http.get<Category[]>('http://localhost:5000/api/category')
    }
}
