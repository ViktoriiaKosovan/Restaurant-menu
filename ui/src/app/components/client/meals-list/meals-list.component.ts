import { CategoriesService } from '../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {MealsService } from '../../../services/meals.service';
import { Meals } from 'src/app/shared/layouts/interfaces/mealsInterfaces';


@Component({
    selector: "app-meals",
    templateUrl: "./meals-list.component.html",
    styleUrls: ["./meals-list.component.css"]
    
})
export class MealsListComponent implements OnInit {

    meals: Meals[] = [];
    firstCategory: any = {};
    
    
    constructor(private mealsService: MealsService, private categoryService: CategoriesService, private route: ActivatedRoute) {
        
     }
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (!params.id) {
                this.categoryService.getAvailableCategories()
                    .subscribe(categories => {
                        this.firstCategory = categories[0];
                        this.mealsService.getAllMealsByCategory(this.firstCategory.id)
                            .subscribe(meals => {
                                this.meals = meals;
                            })
                    })
            } else {
                this.mealsService.getAllMealsByCategory(params.id)
                    .subscribe(meals => {
                        this.meals = meals;
                    })
            }
           
        })
    }

}