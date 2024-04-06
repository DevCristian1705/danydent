import { Inject, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../app/auth/services/auth.service";
import { Router } from "express";

export const AUTH_GUARD: CanActivateFn = 
( route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
    const AUTH_SERVICE = inject(AuthService);
    const ROUTER = Inject(Router);

    AUTH_SERVICE.isAuthentication || ROUTER.navigateByUrl('/auth')

    return true;
}