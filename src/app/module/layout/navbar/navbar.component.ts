import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/_service/authentication.service';
import { Category } from '../../product/_model/category';
import { CategoryService } from '../../product/_service/category.service';
import { SwalMessages } from '../../commons/_model/swal-messages';
import { Router } from '@angular/router';

declare var $: any; // JQuery

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  categories: Category[] = []; // categories list
  swal: SwalMessages = new SwalMessages(); // swal messages
  isAdmin = false;
  loggedIn = false;

  constructor(
    private categoryService: CategoryService,
    private servicioAutenticacion: AuthenticationService,
    private router: Router
  ){}
  
  ngOnInit(){
    if(localStorage.getItem("token")){
      this.loggedIn = true;
    }
    if(localStorage.getItem("user")){
      let user = JSON.parse(localStorage.getItem("user")!);
      if(user.rol == "ADMIN"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    }
  this.getCategories();

  }

  logout(){
    console.log("hhhhh");
    this.servicioAutenticacion.logOut();
    this.loggedIn = false;
    // this.router.navigate(['login']);
    window.location.reload();
  }

  getCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
  

  showProductCategory(category_id: number){
    console.log("Refresco ",category_id);
    this.router.navigate(['product/category/' + category_id]);
  }

} 
