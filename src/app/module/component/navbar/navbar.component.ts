import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/_service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(
    private servicioAutenticacion: AuthenticationService
  ){}

  loggedIn = false;
  
  ngOnInit(){
    if(localStorage.getItem("token")){
      this.loggedIn = true;
    }
  }

  logout(){
    this.servicioAutenticacion.logOut();
  }



}
