import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("user")){
    let user = JSON.parse(localStorage.getItem("user")!);
    if(user.rol == "ADMIN"){
      return true;
    }
  }
  inject(Router).navigate(['/']);
  return false;  
};
