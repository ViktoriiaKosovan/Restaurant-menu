import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Meals, MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  meals: Meals[] = [];
    firstCategory: any = {};
    
    constructor(private mealsService: MealsService, private categoryService: CategoriesService, private route: ActivatedRoute) {
        
     }
  ngOnInit(): void {
  }

}
