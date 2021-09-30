import { Pipe, PipeTransform } from '@angular/core';
import { Meals } from '../shared/layouts/interfaces/mealsInterfaces';


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