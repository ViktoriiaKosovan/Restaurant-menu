import { Meals } from 'src/app/services/meals.service';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterMeal'
})
export class FilterPipeMeal implements PipeTransform {

 transform(meals: Meals[], search: string = '', field: string = 'name'): Meals[] {
    if (!search.trim()) {
      return meals
    }

    return meals.filter(meal => {
      return meal.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}