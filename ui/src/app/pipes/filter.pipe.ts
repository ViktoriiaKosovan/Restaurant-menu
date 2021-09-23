import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../services/categories.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 transform(categories: Category[], search: string = '', field: string = 'title'): Category[] {
    if (!search.trim()) {
      return categories
    }

    return categories.filter(category => {
      return category.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
