import { mockFavoriteOffers } from './../../mock/favorite-offers-card.mock';
import { DataManipulationService } from './../../services/data-manipulation.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { OffersService } from './../../services/offers.service';
import { FavoriteOffer, FavoriteOffers } from './../../models/offer.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { mockOffers } from 'src/app/mock/offers-card.mock';
import { Offer } from 'src/app/models/offer.interface';
import { FavoriteOffersService } from 'src/app/services/favorit-offers.service';
import { first, map, takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  allOffers: Offer[] = mockOffers;

  favoriteOffers: string[] = mockFavoriteOffers.favorites;

  private filteredOffers: Offer[] = [];

  private sortededOffers: Offer[] = [];

  manipulatedOffers: Offer[] = []; // Sorted and/or filtered offers

  searchQuery = '';

  filterConfig = '';

  sortDirection: 'ASC' | 'DESC' = 'DESC';

  sortedBy: 'highestBid' | 'offerPublicationDate' = 'highestBid';

  private ngDestroy$ = new Subject();

  loading = true;

  constructor(private offerService: OffersService, 
              private favoriteOfferService: FavoriteOffersService, 
              private dataManipService: DataManipulationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.fetchData();
  }

  private fetchData(): void {
    const offers$ = this.offerService.getOffers().pipe(
      first(),
    );
    const favoriteOffers$ = this.favoriteOfferService.getFavoriteOffers().pipe(
      map((resp) => resp.favorites),
    );

    combineLatest([offers$, favoriteOffers$]).pipe(
      takeUntil(this.ngDestroy$)
    ).subscribe(([offers, favOffers]) => {
      this.allOffers = offers;
      this.manipulatedOffers = this.allOffers;
      this.favoriteOffers = favOffers;
      this.sortOffers();
      this.loading = false;
      this.spinner.hide();
    });
  }

  searchConfigUpdate(event: Event): void {
    const { target } = event;
    this.filterConfig = (target as HTMLButtonElement).value;
  }

  searchOffers(query: string): void {
    const searchTerm = query.toLowerCase();
    const offersToBeFiltered = this.sortededOffers.length ? [...this.sortededOffers] : [...this.allOffers];
    this.filteredOffers = offersToBeFiltered.filter(this.dataManipService.filterOption(searchTerm, this.filterConfig));
    this.manipulatedOffers = [...this.filteredOffers];
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC';
    this.sortOffers();
  }

  sortConfigUpdate(event: Event): void {
    const { target } = event;
    this.sortedBy = (target as HTMLButtonElement).value as ('highestBid' | 'offerPublicationDate');
  }
  sortOffers(): void {
    const offersToBeSorted = this.filteredOffers.length ? [...this.filteredOffers] : [...this.allOffers];
    this.sortededOffers = offersToBeSorted.sort(this.dataManipService.sortOptions(this.sortedBy, this.sortDirection));
    this.manipulatedOffers = [...this.sortededOffers];
  }

  updateOffer(offer: FavoriteOffer, currentOffer: Offer) {
    let updateAction: Observable<FavoriteOffers>;
    if (offer.addToFavorite) {
      updateAction = this.favoriteOfferService.addToFavoriteOffers(offer.offerId, currentOffer);
    } else {
      updateAction = this.favoriteOfferService.removeFromFavoriteOffers(offer.offerId);
    }
    updateAction.pipe(
      takeUntil(this.ngDestroy$),
      map((res) => res.favorites),
      )
      .subscribe((response) => {
      this.favoriteOffers = response;
    });
  }

  isFavoriteOffer(offer: Offer): boolean {
    return this.favoriteOffers.find((uid) => offer.uid === uid)? true : false;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
  }

}
