import { Meals, MealsService } from './../../services/meals.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['./manage-meals.component.css']
})
export class ManageMealsComponent implements OnInit {

  form: FormGroup;
 
  categories: Category[] = [];
  meals: Meals[] = [];
  showFormEdit: boolean = false;
  meal: Meals | undefined;
  id: string | undefined;
  deleteId: string | undefined;
  // search: string = '';

  constructor(private mealsService: MealsService, private categoryService: CategoriesService) {
 this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      categoryId: new FormControl(),
      img: new FormControl(),
      description: new FormControl(),
      weight: new FormControl(),
      price: new FormControl(),
      availability: new FormControl()
  });
  }

  ngOnInit() {
    this.categoryService.getAllCategories()
       .subscribe(categories => {
          this.categories = categories;
            })
  
     this.mealsService.getAllMeals()
       .subscribe(meals => {
          this.meals = meals;
            })
  }
 hideEditForm() {
   this.showFormEdit = false;
   this.form.reset();
 }
  
  deleteMeal(mealId: string | undefined) {
    this.deleteId = mealId;
    this.mealsService.deleteMeal(this.deleteId)
      .subscribe(() => {
        alert("Meal deleted")
      });
  }
  showEditForm(mealId: string | undefined): void {
     this.id = mealId;
    if (this.id) {
      this.mealsService.getMealById(this.id)
        .subscribe(meal => {
          console.log(meal);
          this.form.patchValue({
            name: meal.name,
            img: meal.img,
            description: meal.description,
            weight: meal.weight,
            price: meal.price,
            categoryId: meal.categoryId,
            availability: meal.availability
          })
        })
      this.showFormEdit = true;
    }
    this.showFormEdit = true;
  }
 submit() {
   if (!this.id) {
     let meal: Meals = {
       name: this.form.value.name,
       categoryId: this.form.value.categoryId,
       img: this.form.value.img,
       description: this.form.value.description,
       weight: this.form.value.weight,
       price: this.form.value.price,
       availability: !!this.form.value.availability
     }
     this.mealsService.addMeal(meal)
       .subscribe(() => {
         this.mealsService.getAllMeals()
           .subscribe(meals => {
             this.meals = meals;
           })
         this.form.reset();
       })
   } else {
     let meal: Meals = {
        id: this.id,
       name: this.form.value.name,
       categoryId: this.form.value.categoryId,
       img: this.form.value.img,
       description: this.form.value.description,
       weight: this.form.value.weight,
       price: this.form.value.price,
       availability: !!this.form.value.availability
     }
     this.mealsService.updateMeal(meal)
       .subscribe((meal) => {
         console.log(meal);
          this.mealsService.getAllMeals()
            .subscribe(meals => {
              this.meals = meals;
            })
        })
   }
      this.form.reset();
}

}
