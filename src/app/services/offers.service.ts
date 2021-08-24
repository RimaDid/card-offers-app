import { mockOffers } from './../mock/offers-card.mock';
import { Injectable } from "@angular/core";
import { Offer } from "../models/offer.interface";
import { ApiService } from "./api.service";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

const BASEURL = '/offer-service-sh3jxse7bq-ew.a.run.app/rest/v1';

@Injectable()

export class OffersService  {

    private urls = {
        offers: () => 'https://offer-service-sh3jxse7bq-ew.a.run.app/rest/v1/offers',
    }
    constructor(private api: ApiService) {
        this.api.setBaseUrl(BASEURL);
    }

    getOffers(): Observable<Offer[]> {
        return this.api.get<Offer[]>(this.urls.offers()).pipe(
            catchError<Offer[], Observable<any>>(() =>  this.getOffersMock()),
        );
    }
    getOffersMock(): Observable<Offer[]> {
        const url = 'http://localhost:3000/offers';
        return this.api.get<Offer[]>(url).pipe(
            catchError<Offer[], Observable<any>>(() =>  of([])),
        );
    }
    
}