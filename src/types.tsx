export interface Event{
    eventId: string,
    title:string,
    date:Date,
    time?:number
}

export interface WeekDays{
    day:string,
    short:string
}

export interface Months{
    month: string,
    short: string
}