export interface IPaginator<T> {
    items: T[];
    total: number;
    page: number;
    perPage: number;
}

export class Paginator<T> implements IPaginator<T> {

    constructor(
        public items: T[],
        public total: number,
        public page: number,
        public perPage: number
    ) {

    }

}