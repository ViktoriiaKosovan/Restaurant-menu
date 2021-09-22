import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/services/categories.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  form: FormGroup;
  categories: Category[] = [];
  category: Category | undefined;

  constructor(private categoriesService: CategoriesService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      availability: new FormControl()
  });
  }

  ngOnInit() {
    
     this.categoriesService.getAllCategories()
       .subscribe(categories => {
          this.categories = categories;
            })
  }
  submit() {
    let category: Category = {
      title: this.form.value.title,
      availability: !!this.form.value.availability
    }
    this.categoriesService.addCategory(category)
      .subscribe(() => {
        this.categoriesService.getAllCategories()
       .subscribe(categories => {
          this.categories = categories;
            })
        this.form.reset();
      })
  }

}
