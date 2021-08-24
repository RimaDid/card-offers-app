import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})

export class AuthGard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() : boolean {
        if(this.authService.isLoggedIn()) {
            return true;
        }
        this.authService.logout();
        this.router.navigate(['/auth']);
        return false;
    }
}