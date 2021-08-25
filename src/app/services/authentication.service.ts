import { Injectable } from "@angular/core";
import { shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import * as moment from "moment";

@Injectable()
export class AuthService {

    private readonly jwt_token = new BehaviorSubject<string>(`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZGVhbGVyQHRydWNrb28uY29tIiwiZXhwIjoxNjI1MjQwODUzLCJpYXQiOjE2MjUyNDA4NTMsImNsYWltcyI6WyJkZWFsZXIiLCJ3b3Jrc2hvcCJdfQ.d_Z7SRCNC8JEooXxy9JRTuWLf8forlAxxN-OLuPlb_B6LotQdQhisb4LrI3eUxduHtAxXEy4HiwqFYD3Gnva2-lOVO9SU461Fm4BamGAuaz2V-VHQtsDXHQn2CsKiFv2lcIM3E9DQO9eUAZj-45zaUSbBbyaxf03wRsIdnwudHkHUHz7wDtuViI58mB40sOBEZxWnKIZ-WhINahTS54dyvYd1QUjFxGM_XwMTm31SfDbdOBfeticdYXTy_KGg9DH5N_VbgHgQT-aQvVMZMmz-WlqyfvrE8STEzw0LDs9i2p9-tIAkUVrcmGK-cDJmqaiuuMirrHo407Pr6DIUr4pjA`);

    private readonly expiresIn = 3600;
      
    public login(): Observable<string> {
        return this.jwt_token.asObservable().pipe(
            tap((res) => this.setSession(res)),
            shareReplay());
    };

    private setSession(authResult: string): void {
        const expiresAt = moment().add(this.expiresIn,'second');

        localStorage.setItem('id_token', authResult);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    public logout(): void {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    public getExpiration(): moment.Moment {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = expiration ? JSON.parse(expiration) : 0;
        return moment(expiresAt);
    }    
}