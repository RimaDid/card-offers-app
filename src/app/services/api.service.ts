import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

/**
* Service for making http requests
*/
@Injectable({
    providedIn: 'root',
})

export class ApiService {

    private base: string = '';
    constructor(
        private http: HttpClient,
    ) { }

    get baseUrl(): string {
        return this.base;
    }

    setBaseUrl(urlBase: string): void {
        this.base = urlBase;
    }

    /**
    * Sends a GET request to an endpoint
    * @param url the endpoint
    * @param params the parameters to send
    */
    public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(
            `${url}`, { params },
        ).pipe(
            catchError<T, Observable<never>>((err: HttpErrorResponse) => throwError(err)),
        );
    }

    /**
    * Sends a POST request to an endpoint
    * @param url the endpoint
    * @param params the parameters to send
    */
    public post(url: string, body: any, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.post(
            `${url}`, body, { params },
        ).pipe(
            catchError((err: HttpErrorResponse) => throwError(err)),
        );
    }

    /**
    * Sends a PUT request to an endpoint
    * @param url the endpoint
    * @param params the parameters to send
    */
    public put(url: string, body:any, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.put(
            `${url}`, body, { params },
        ).pipe(
            catchError((err: HttpErrorResponse) => throwError(err)),
        );
    }

    /**
    * Sends a DELETE request to an endpoint
    * @param url the endpoint
    * @param params the parameters to send
    */
    public delete(url: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.delete(
            `${url}`, { params },
        ).pipe(
            catchError((err: HttpErrorResponse) => throwError(err)),
        );
    }
}
