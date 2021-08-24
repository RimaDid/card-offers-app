import { FavoriteOffer } from './../../models/offer.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from 'src/app/models/offer.interface';

@Component({
  selector: 'app-offer-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() offer!: Offer;

  @Input() isFavorite = false; 

  @Output() isFavoriteOffersChange = new EventEmitter<FavoriteOffer>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleFavoriteCard(): void {
    this.isFavorite = !this.isFavorite;
    this.isFavoriteOffersChange.emit({offerId: this.offer.uid, addToFavorite: this.isFavorite,});
  }

}
