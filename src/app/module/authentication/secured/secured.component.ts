import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrl: './secured.component.css'
}) 

export class SecuredComponent{

  constructor(private servicioAutenticacion: AuthenticationService, private http: HttpClient,private router: Router){}

  logout(){

    console.log('Cerrando Sesión');
    this.servicioAutenticacion.logOut();
    //this.router.navigate(['']);
  }
}
