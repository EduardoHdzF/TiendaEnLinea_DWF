import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import {HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  categories: Category[] = [];  
  private url = "http://localhost:8080";
  private source = "/category";

  constructor( private http: HttpClient ){

    
  }
  
  getCategories(): Observable<HttpResponse<Category[]>>{
    // let categories: Category[]=[];

   return this.http.get<Category[]>(this.url + this.source, {observe: 'response'});

    // return categories;

  }
}
