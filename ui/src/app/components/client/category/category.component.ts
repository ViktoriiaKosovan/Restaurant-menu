import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/layouts/interfaces/categoriesInterfaces';
import {CategoriesService } from '../../../services/categories.service';

@Component({
    selector: "app-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.css"]
    
})
export class CategoryComponent implements OnInit {
    menuToggle: boolean = false;
    categories: Category[] = [];
    constructor(private categoriesService: CategoriesService) { }
    ngOnInit() {
        this.categoriesService.getAvailableCategories()
        .subscribe(categories => {
                this.categories = categories;
            })
    }
 }