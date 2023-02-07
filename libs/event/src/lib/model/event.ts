import { Category } from './category';
export class Event {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string;
    brand?: string;
    price?: number;
    category?: Category;
    countInStock?: string;
    rating?: string;
    numReviews?: string;
    isFeatured?: string;
    dateCreated?: string;
}
