import { MealsService } from "../../../services/meals.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoriesService } from "src/app/services/categories.service";
import { emptyStringValidator } from "src/app/validators/emptyStringValidator";
import { Category } from "src/app/shared/layouts/interfaces/categoriesInterfaces";
import { Meals } from "src/app/shared/layouts/interfaces/mealsInterfaces";

@Component({
  selector: "app-manage-meals",
  templateUrl: "./manage-meals.component.html",
  styleUrls: [
    "../../../shared/layouts/manager-layout/manager-layout.component.css",
  ],
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
  imgFile: string | undefined;
  mealAvail!: boolean;
  search: string = "";

  constructor(
    private mealsService: MealsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
        emptyStringValidator(),
      ]),
      categoryId: new FormControl("", [Validators.required]),
      file: new FormControl(),
      img: new FormControl("", [Validators.required, emptyStringValidator()]),
      description: new FormControl(),
      weight: new FormControl("", [
        Validators.required,
        Validators.maxLength(5),
        emptyStringValidator(),
      ]),
      price: new FormControl("", [
        Validators.required,
        Validators.maxLength(5),
        emptyStringValidator(),
      ]),
      availability: new FormControl(),
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.mealsService.getMeals().subscribe((meals) => {
      this.meals = meals;
    });
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  toggleAvailability(mealId: string | undefined, mealAvail: boolean) {
    this.id = mealId;
    this.mealAvail = mealAvail;
    let newMeals: Meals[] = this.meals.map((meal: Meals) => {
      if (meal.id == this.id) {
        meal.availability = !this.mealAvail;
      }
      return meal;
    });
    this.mealsService
      .updateMealAvailability({ id: this.id, availability: !this.mealAvail })
      .subscribe(() => {
        this.mealsService.updateMeals(newMeals);
      });
  }

  onImageChange(e: any) {
    const reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.form.patchValue({
          img: reader.result,
        });
      };
    }
  }

  showEditForm(mealId: string | undefined = undefined): void {
    this.id = mealId;
    if (this.id) {
      this.mealsService.getMealById(this.id).subscribe((meal) => {
        this.form.patchValue({
          name: meal.name,
          img: meal.img,
          description: meal.description,
          weight: meal.weight,
          price: meal.price,
          categoryId: meal.categoryId,
          availability: meal.availability,
        });
        this.imgFile = meal.img;
      });

      this.showFormEdit = true;
    } else {
      this.imgFile = "";
      this.showFormEdit = true;
      this.form.reset();
    }
  }

  hideEditForm() {
    this.showFormEdit = false;
  }

  submit() {
    let meal: Meals = {
      name: this.form.value.name.toUpperCase(),
      categoryId: this.form.value.categoryId,
      img: this.form.value.img,
      description: this.form.value.description,
      weight: this.form.value.weight,
      price: this.form.value.price,
      availability: !!this.form.value.availability,
    };
    if (!this.id) {
      this.mealsService.addMeal(meal).subscribe(
        () => {
          this.mealsService.getAllMeals().subscribe((meals) => {
            alert("Meal added!");
            this.mealsService.updateMeals(meals);
          });
          this.form.reset();
        },
        (err) => {
          if (err) alert(err.error.message);
          this.showEditForm();
        }
      );
    } else {
      let updateMeal: Meals = { id: this.id, ...meal };
      let updateMeals: Meals[] = this.meals.map((meal: Meals) => {
        return meal.id === this.id ? (meal = updateMeal) : meal;
      });

      this.mealsService.updateMeal(updateMeal).subscribe(
        () => {
          alert("Meal updated!");
          this.mealsService.updateMeals(updateMeals);
        },
        (err) => {
          if (err) alert(err.error.message);
          this.showEditForm();
        }
      );
    }
    this.form.reset();
  }

  deleteMeal(mealId: string | undefined) {
    let meals: Meals[] = this.meals.filter((meal: Meals) => meal.id !== mealId);
    let result = confirm("Do you want delete this meal?");
    if (result) {
      this.mealsService.deleteMeal(mealId).subscribe(() => {
        alert("Meal deleted");
        this.mealsService.updateMeals(meals);
      });
    } else {
      alert("Meal was not deleted");
    }
  }
}
