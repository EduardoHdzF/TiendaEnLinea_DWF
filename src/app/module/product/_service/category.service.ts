import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  categories: Category[] = [];  
  
  constructor(){

  }
  
  getCategories(){
    let categories: Category[]=[];

    categories.push(new Category(1, "Electronics", "CAT1", 1));
    categories.push(new Category(2, "Technoology", "CAT2", 0));
    categories.push(new Category(3, "Sweets", "CAT3", 1));

    return categories;

  }
}
