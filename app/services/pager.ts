export interface IPaginatedResponse<T> {
    items: T[];
    page: number;
    perPage: number;
    total: number;
}

export class PaginatedResponse<T> implements IPaginatedResponse<T> {
    constructor(
        public items: T[],
        public total: number,
        public page: number,
        public perPage: number
    ) {
    }
}
