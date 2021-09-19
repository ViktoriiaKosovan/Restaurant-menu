import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Category {
    id?: string,
    title: string,
    availability: boolean
}

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
    
})
export class HeaderComponent implements OnInit {
    menuToggle: boolean = false;
    title: string = "Welcome to Leoresto";
    slogan: string = "Taste the perfection!";
    managerBtn: string = "MANAGE";
    categories: Category[] = [];
    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.http.get<Category[]>('http://localhost:5000/api/category')
            .subscribe(categories => {
                console.log(categories);
                this.categories = categories;
            })
    }
 }