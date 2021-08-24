import { Injectable } from "@angular/core";
import { Offer } from "../models/offer.interface";

/**
* Service for making http requests
*/
@Injectable()

export class DataManipulationService {

      /**
       * @param searchTerm is the provided string bhy the user in lowercase
       * @returns the filter condition whether we filter by the tags and/or title
       */
      public filterOption(searchTerm: string, filterConfig: string): (offer: Offer) => boolean{
        if(filterConfig === 'tags') {
          return ({tags}: Offer) => this.filterByStringArray(tags, searchTerm);
        }
        if (filterConfig === 'title') {
          return ({title}: Offer) => this.filterByString(title, searchTerm);
        }
          return ({tags, title}: Offer) => (this.filterByStringArray(tags, searchTerm) || this.filterByString(title, searchTerm));
      }
    
    
      private filterByStringArray(array: string[], query: string): boolean {
        return array.some((item) => item.toLowerCase().includes(query));
      }
    
      private filterByString(str: string, query: string): boolean {
        return str.toLowerCase().includes(query);
      }
    
      
    /**
     * 
     * @param sortedBy the field used for sorting
     * @param sortDirection direction of the sort
     * @returns sort function according to the config we have
     */
      public sortOptions(sortedBy: string, sortDirection: 'ASC' | 'DESC'): (offerA: Offer, offerB: Offer) => number {
        if( sortedBy === 'highestBid') {
          return (offerA: Offer, offerB: Offer) => this.sortByNumber(offerA.highestBid, offerB.highestBid, sortDirection);
        }
        return (offerA: Offer, offerB: Offer) => this.sortByDate(offerA.offerPublicationDate, offerB.offerPublicationDate, sortDirection);
      }
    
      private sortByNumber(valueA: number, valueB: number, direction:'ASC' | 'DESC'): number {
        return direction === 'ASC'? valueA - valueB : valueB - valueA;
      }
    
      private sortByDate(valueA: string | Date, valueB: string | Date, direction:'ASC' | 'DESC'): number {
        return direction === 'ASC'
              ? new Date(valueA).getTime() - new Date(valueB).getTime() 
              : new Date(valueB).getTime() - new Date(valueA).getTime();
      }
}
