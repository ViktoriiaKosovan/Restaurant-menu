import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from 'src/app/services/categories.service';
import { exitingCategoryNameValidator } from 'src/app/validators/categoriesValidator';
import { emptyStringValidator } from 'src/app/validators/emptyStringValidator';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['../../shared/layouts/manager-layout/manager-layout.component.css']
})
  
  
export class ManageCategoriesComponent implements OnInit {

  form!: FormGroup;
  categories: Category[] = [];
  category!: Category;
  showFormEdit: boolean = false;
  id: string | undefined;
  search: string = '';
  errorMessage:any;
  loading = false;
  categoryAvail!: boolean;


  constructor(private categoriesService: CategoriesService, private validator: exitingCategoryNameValidator) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30), emptyStringValidator()]),
      availability: new FormControl()
    });
   
     this.categoriesService.getAllCategories()
       .subscribe(categories => {
          this.categories = categories;
       })
     
  }

toggleAvailability(categoryId: string | undefined, categoryAvail: boolean ) {
    this.id = categoryId;
    this.categoryAvail=categoryAvail
    this.categoriesService.updateCategoryAvailability({ id: this.id, availability: !this.categoryAvail }).subscribe(() => {
       this.categoriesService.getAllCategories()
           .subscribe(categories => {
             this.categories = categories;
           })
    })
  } 

  hideEditForm() {
    this.showFormEdit = false;  
 }

  showEditForm(categoryId: string | undefined=undefined): void {
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
   
  let category: Category = {
        title: this.form.value.title.toUpperCase(),
        availability: !!this.form.value.availability
      }
    if (!this.id) {
      this.categoriesService.addCategory(category)
        .subscribe(() => {
          this.categoriesService.getAllCategories()
            .subscribe(categories => {
              this.categories = categories;
            })
        }, (err) => {                              
          if  (err) alert(err.error.message);
            this.showEditForm()
    })
    } else {
      let updateItem: Category = {
        id: this.id,
        ...category
      }
      this.categoriesService.updateCategory(updateItem)
        .subscribe(() => {
          this.categoriesService.getAllCategories()
            .subscribe(categories => {
              this.categories = categories;
            })
        }, (err) => {                              
          if  (err) alert(err.error.message);
            this.showEditForm(this.id)
    })
    }
    this.form.reset();
  }

}
