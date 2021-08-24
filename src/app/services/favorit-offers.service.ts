import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Offer } from '../models/offer.interface';
import { mockFavoriteOffers } from '../mock/favorite-offers-card.mock';
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

export type FavAction = 'get' | 'add' | 'remove';

const BASEURL = 'https://crm-service-sh3jxse7bq-ew.a.run.app/rest/v1';
// for json server purpose only 
const MOCKURL = 'http://localhost:3000/favorite_offers';

@Injectable()

export class FavoriteOffersService  {

    private urls = {
        favorites: (action: FavAction) => `${BASEURL}/contacts/favorites/${action}`,
    }
    constructor(private api: ApiService) {
        this.api.setBaseUrl(BASEURL);
    }

    getFavoriteOffers(): Observable<Offer[]> {
        return this.api.get<Offer[]>(this.urls.favorites('get')).pipe(
            catchError<Offer[], Observable<any>>(() =>  this.getOffersMock()),
        );
    }
    private getOffersMock(): Observable<Offer[]> {
        return this.api.get<Offer[]>(MOCKURL).pipe(
            catchError<Offer[], Observable<any>>(() =>  of(mockFavoriteOffers)),
        );
    }

    addToFavoriteOffers(offerId: string, bodyMock?: Offer): Observable<any> {
        const body = {"offerID": offerId};
        return this.api.put(this.urls.favorites('add'), body).pipe(
            catchError(() =>  this.addToFavoriteOffersMock(offerId, bodyMock)),
        );
    }
    private addToFavoriteOffersMock(offerId: string, body?: Offer): Observable<any> {
        return this.api.put(`${MOCKURL}/${offerId}`, body).pipe(
            catchError(() =>  throwError('could not add to Favoritenoffer')),
        );
    }

    removeFromFavoriteOffers(offerId: string): Observable<any> {
        const body = {"offerID": offerId};
        return this.api.put(this.urls.favorites('remove'), body).pipe(
            catchError(() =>  this.removeFromFavoriteOffersMock(offerId)),
        );
    }
    private removeFromFavoriteOffersMock(offerId: string): Observable<any> {
        return this.api.delete(`${MOCKURL}/${offerId}`);
    }

    
}