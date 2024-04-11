import { Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  return true;
};
