import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  categories: Category[] = [];
  private source = "/category";

  constructor( private http: HttpClient ){
  }

  getCategory(id: number): Observable<HttpResponse<Category>>{
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + id, { observe : 'response'});
  }
  getActiveCategories(): Observable<HttpResponse<Category[]>>{
    return this.http.get<Category[]>(api_dwb_uri +  this.source + "/acive", {observe: 'response'});
  }
  createCategory(category:any): Observable<HttpResponse<any>>{
    return this.http.post(api_dwb_uri + this.source, category, {observe:'response'});
  }
  updateCategory(category: any, id: number): Observable<HttpResponse<any>>{
    return this.http.put(api_dwb_uri + this.source + "/" + id, category, {observe: 'response'});
  }
  deleteCategory(id: number): Observable<HttpResponse<any>>{
    return this.http.delete(api_dwb_uri + this.source + "/" + id,  {observe: 'response'});
  }
  activateCategory(id: number): Observable<HttpResponse<any>>{
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate",  null,  {observe: 'response'});
  }
  getCategories(): Observable<HttpResponse<Category[]>>{
    return this.http.get<Category[]>(api_dwb_uri + this.source, {observe: 'response'});
  }
  
}
