export interface Offer {
    uid: string,
    id?: string, // fort tesing with json server
    title: string,
    askPrice: number,
    bidPrice: number,
    soldForPrice: number,
    highestBid: number,
    highestBidEver: number,
    serviceFee: number,
    checkDate: string | Date,
    offerPublicationDate: string | Date,
    isPublished: boolean,
    isAccepted: boolean | null,
    isSold: boolean,
    location: string,
    shortCode: string,
    tags: string[];
    vehicle_picture_front: string,
    originalAssessment: OriginalAssessment,
}

export interface OriginalAssessment {
    vehicle_picture_front?: string[],
    mass_main_smaller75_body?: string[],
    state_main_accidentdamage?: string[],
    year_of_manufacture?: string[],
    mass_main?: string[],
}

export interface FavoriteOffer {
    offerId: string,
    addToFavorite: boolean,
}