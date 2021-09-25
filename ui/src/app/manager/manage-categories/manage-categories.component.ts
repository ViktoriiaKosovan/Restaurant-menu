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
  showFormEdit: boolean = false;
  id: string | undefined;
  search: string = '';

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
  hideEditForm() {
    this.showFormEdit = false;
   
 }

  showEditForm(categoryId: string | undefined): void {
    
    this.id = categoryId;
    if (this.id) {
      this.categoriesService.getCategoryById(this.id)
        .subscribe(category => {
        
          this.form.patchValue({
            title: category.title,
            availability: category.availability
          })
        })
      this.showFormEdit = true;
    } else {
      this.showFormEdit = true;
      this.form.reset();
    }
  }

  submit() {
    if (!this.id) {
      let category: Category = {
        title: this.form.value.title,
        availability: !!this.form.value.availability
      }
      this.categoriesService.addCategory(category)
        .subscribe(() => {
          console.log(category);
          this.categoriesService.getAllCategories()
            .subscribe(categories => {
              this.categories = categories;
            })
          
        })
    } else {
      let category: Category = {
        title: this.form.value.title,
        id: this.id,
        availability: !!this.form.value.availability
      }
      console.log(category)
      this.categoriesService.updateCategory(category)
        .subscribe(() => {
          this.categoriesService.getAllCategories()
            .subscribe(categories => {
              this.categories = categories;
            })
        })
    }
    this.form.reset();
  }

}
