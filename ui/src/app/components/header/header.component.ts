import { Component, OnInit } from '@angular/core';
import { Category, CategoriesService } from '../../services/categories.service';



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
    constructor(private categoriesService: CategoriesService) { }
    ngOnInit() {
        this.categoriesService.getAllCategories()
        .subscribe(categories => {
                this.categories = categories;
            })
    }
 }