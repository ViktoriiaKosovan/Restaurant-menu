import { Meals, MealsService } from './../../services/meals.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/services/categories.service';
import { exitingMealNameValidator } from 'src/app/validators/mealValidator';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['../../shared/layouts/manager-layout/manager-layout.component.css']
})
export class ManageMealsComponent implements OnInit {

  @ViewChild("input")
  inputRef!: ElementRef;
  form!: FormGroup;
  categories: Category[] = [];
  meals: Meals[] | any = [];
  showFormEdit: boolean = false;
  meal: Meals | undefined;
  id: string | undefined;
  deleteId: string | undefined;
  search: string = '';
  imgFile: string | undefined;
  mealAvail!: boolean;
  
  

  constructor(private mealsService: MealsService, private categoryService: CategoriesService, private validator: exitingMealNameValidator) {
   
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)],
      this.validator.validate.bind(this.validator)),
      categoryId: new FormControl(),
      file: new FormControl(''),
      img: new FormControl('', [Validators.required]),
      description: new FormControl(),
      weight: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      availability: new FormControl()
  });

    this.categoryService.getAllCategories()
       .subscribe(categories => {
          this.categories = categories;
            })
  
     this.mealsService.getMeals()
       .subscribe(meals => {
         this.meals = meals;
            })
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  toggleAvailability(mealId: string | undefined, mealAvail: boolean) {
    this.id = mealId;
    this.mealAvail = mealAvail;
    let newMeals: Meals[] = this.meals.map((meal: Meals) => {
      if (meal.id == this.id) {
        meal.availability = !this.mealAvail
      }
      return meal;
    })
    this.mealsService.updateMealAvailability({ id: this.id, availability: !this.mealAvail }).subscribe(() => {
    this.mealsService.updateMeals(newMeals)
     })
  }
 

 onImageChange(e: any) {
    const reader = new FileReader();
   if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.form.patchValue({
          img: reader.result
        });
   
      };
    }
 }
  
 hideEditForm() {
   this.showFormEdit = false;
  
 }
  
 
  showEditForm(mealId: string | undefined): void {
     this.id = mealId;
    if (this.id) {
      this.mealsService.getMealById(this.id)
        .subscribe(meal => {
          this.form.patchValue({
            name: meal.name,
            img: meal.img,
            description: meal.description,
            weight: meal.weight,
            price: meal.price,
            categoryId: meal.categoryId,
            availability: meal.availability
          })
          this.imgFile = meal.img;
        })
      
      this.showFormEdit = true;
    } else {
      this.imgFile = '';
      this.showFormEdit = true;
      this.form.reset();
    }
  }

   deleteMeal(mealId: string | undefined) {
     this.deleteId = mealId;
      let meals: Meals[] = this.meals.filter((meal:Meals) => {
          if (meal.id !== this.deleteId) {
            return meal;
          }
          return;
        })
    this.mealsService.deleteMeal(this.deleteId)
      .subscribe(() => {
      this.mealsService.updateMeals(meals)
      confirm("Do you want delete this meal?") ? alert("Meal deleted") : alert("Meal was not deleted");
      });
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
             this.mealsService.updateMeals(meals);
           })
         this.form.reset();
       })
   } else {
     let updateMeal: Meals = {
       id: this.id,
       name: this.form.value.name,
       categoryId: this.form.value.categoryId,
       img: this.form.value.img,
       description: this.form.value.description,
       weight: this.form.value.weight,
       price: this.form.value.price,
       availability: !!this.form.value.availability
     }
     let updateMeals: Meals[] = this.meals.map((meal: Meals) => {
       if (meal.id == this.id) {
         meal = updateMeal;
      }
      return meal;
    })
     console.log(updateMeals)
     this.mealsService.updateMeal(updateMeal)
       .subscribe(() => {
          this.mealsService.updateMeals(updateMeals);
        })
   }
      this.form.reset();
}

}
