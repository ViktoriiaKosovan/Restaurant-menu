import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/services/categories.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  formAdd: FormGroup;
  form: FormGroup;
  categories: Category[] = [];
  category: Category | undefined;
  showFormEdit: boolean = false;
  showFormAdd: boolean = false;
  id: string | undefined;
 

  constructor(private categoriesService: CategoriesService) {
    this.formAdd = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      availability: new FormControl()
    });
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
 
 showAddForm():void {
    this.showFormAdd = true;
  }
  showEditForm(categoryId: string|undefined):void {
    this.id = categoryId;
    this.categoriesService.getCategoryById(this.id)
      .subscribe(category => {
        this.form.patchValue({
          title: category.title,
          availability: category.availability 
        })
      })
    this.showFormEdit = true;
  }

  submitAdd() {
    let category: Category = {
      title: this.formAdd.value.title,
      availability: !!this.formAdd.value.availability
    }
    this.categoriesService.addCategory(category)
      .subscribe(() => {
        this.categoriesService.getAllCategories()
          .subscribe(categories => {
            console.log(categories);
          this.categories = categories;
            })
        this.formAdd.reset();
      })
}
  submit() {
    let category: Category = {
      title: this.form.value.title,
      id: this.id,
      availability: !!this.form.value.availability
    }
    this.categoriesService.updateCategory(category)
      .subscribe(() => {
        this.categoriesService.getAllCategories()
       .subscribe(categories => {
          this.categories = categories;
            })
       
      })
  }

}
