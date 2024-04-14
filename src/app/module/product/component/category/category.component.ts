import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from'sweetalert2';

declare var $: any; // JQuery

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {

  categories: Category[] = [];

  // Category form
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]],
  });

  submitted = false; // Form submitted

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,){
    
  }

  ngOnInit(){
    this.getCategories();
  }

  onSubmit(){
    // add region to region list
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        // show message
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: v.body!.message,
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });


        // reload regions
        this.getCategories();


        // close modal
        this.hideModalForm();
      },
      error: (e) => {
        console.error(e);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          text: e.error!.message,
          background: '#F8E8F8',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });

  //  // ---- validate form
  //   this.submitted = true;
  //   if(this.form.invalid) return;
  //   this.submitted = false;

  //   // add region to region list
  //   let id = this.categories.length + 1;
  //   let category = new Category(id, this.form.controls['category'].value!, this.form.controls['acronym'].value!, 1);
  //   this.categories.push(category);

  //   // close modal
  //   this.hideModalForm();

  //   // show message
  //   Swal.fire({
  //     position: 'top-end',
  //     icon: 'success',
  //     toast: true,
  //     text: 'La categoría se registró correctamente',
  //     background: '#e9fcdc',
  //     showConfirmButton: false,
  //     timer: 2500
  //   });

  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      // respuesta => {
      //   this.categories=respuesta.body!;
      // },
      // error => {
      //   // console.error(e)
      //   alert("algo salió mal");

      // }
      next: (v) => this.categories = v.body!,
      error: (e) => console.error(e)
    });
  }

  showModalForm(){
    $("#staticBackdrop").modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm(){
    $("#staticBackdrop").modal("hide");
  }

}
