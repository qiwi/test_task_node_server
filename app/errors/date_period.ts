interface IDatePeriodError {
    description: string;
    startDate: Date;
    endDate: Date;
}

export class DatePeriodError extends Error {
    public static readonly ERROR_CODE: string = "DATE_PERIOD_BAD_SEQUENCE";
    public static readonly DESCRIPTION: string = "Start date is greater than end date";

    public error: string;
    public details: IDatePeriodError;
    public message: string;

    constructor(m: string, startValueL: Date, endValueL: Date) {
        super(m);

        this.error = DatePeriodError.ERROR_CODE;
        this.details = {
            description: DatePeriodError.DESCRIPTION,
            startDate: startValueL,
            endDate: endValueL
        };
        this.message = m;

        Object.setPrototypeOf(this, DatePeriodError.prototype);
    }
}