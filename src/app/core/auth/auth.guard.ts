import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";



export const AuthGuard:CanActivateFn = (route, state) => {  
console.info('guard est marche ');
const authService = inject(AuthService); // Injecte le service d'authentification.
const router = inject(Router); // Injecte le service de routage.
if(!authService.isLoggedIn()){
    router.navigate(['/login'])   
    return  false;
}
return true; // Autorise l'accès à la route.
}

