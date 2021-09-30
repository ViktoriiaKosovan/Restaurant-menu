import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../shared/layouts/interfaces/categoriesInterfaces';


@Pipe({
  name: 'filter'
})
export class FilterPipeCategory implements PipeTransform {

 transform(categories: Category[], search: string = '', field: string = 'title'): Category[] {
    if (!search.trim()) {
      return categories
    }

    return categories.filter(category => {
      return category.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
