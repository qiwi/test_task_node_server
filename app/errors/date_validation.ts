interface IDateValidationError {
    invalidField: string;
    invalidValue: string;
}

export class DateValidationError extends Error {
    public static readonly ERROR_CODE: string = "ERROR_VALIDATION_NO_DATE";

    public error: string;
    public details: IDateValidationError;
    public message: string;

    constructor(m: string, invalidFieldL: string, invalidValueL: string) {
        super(m);

        this.error = DateValidationError.ERROR_CODE;
        this.details = {
            invalidField: invalidFieldL,
            invalidValue: invalidValueL
        };
        this.message = m;

        Object.setPrototypeOf(this, DateValidationError.prototype);
    }
}