import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Meals,MealsService } from './meals-list.service';


@Component({
    selector: "app-meals",
    templateUrl: "./meals-list.component.html",
    styleUrls: ["./meals-list.component.css"]
    
})
export class MealsListComponent implements OnInit {

    meals: Meals[] = [];
    
    constructor(private mealsService: MealsService, private route: ActivatedRoute) { }
    ngOnInit():void {
        this.route.params.subscribe((params: Params) => {
            this.mealsService.getAllMealsByCategory(params.id)
            .subscribe(meals => {
                this.meals = meals;
            })
        })
       
    }

}