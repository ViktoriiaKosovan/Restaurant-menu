
import { Meals, MealsService } from './../../services/meals.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/services/categories.service';
import { exitingMealNameValidator } from 'src/app/validators/mealValidator';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['./manage-meals.component.css']
})
export class ManageMealsComponent implements OnInit {

  @ViewChild("input")
  inputRef!: ElementRef;
  @ViewChild('myCheckbox')
  myCheckbox!: ElementRef;
  form!: FormGroup;
  categories: Category[] = [];
  meals: Meals[] = [];
  showFormEdit: boolean = false;
  meal: Meals | undefined;
  id: string | undefined;
  deleteId: string | undefined;
  search: string = '';
  imgFile: string | undefined;
  // mealAval!: Meals;
  // mealAval!: Meals;
  isChecked!: boolean;
  

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
  
     this.mealsService.getAllMeals()
       .subscribe(meals => {
          this.meals = meals;
            })
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }


  toggleAvailability() {
    console.log(this.myCheckbox)
  }
  // toogleAvailability({ ...mealAval }: any) {
  //   console.log(this.myCheckbox.nativeElement.checked)
  //   this.mealAval = mealAval;
    
  //   if (this.myCheckbox.nativeElement.checked) {
  //     this.mealsService.updateMeal({ ...this.mealAval, availability: true }).subscribe(() => {
  //       this.mealsService.getAllMeals()
  //          .subscribe(meals => {
  //            this.meals = meals;
  //          }) })
  //   } else {
  //     this.mealsService.updateMeal({ ...this.mealAval, availability: false }).subscribe(() => {
  //       this.mealsService.getAllMeals()
  //          .subscribe(meals => {
  //            this.meals = meals;
  //          })
  //     })
  //   }
    
  // }

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
  submit() {
   console.log(this.form.value);
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
       .subscribe(() => {
          this.mealsService.getAllMeals()
            .subscribe(meals => {
              this.meals = meals;
            })
        })
   }
      this.form.reset();
}

}
