
export let d = (t:number): Date => new Date(t)
export let t = (d:number | string | Date): number => new Date(d).getTime()

export function makeRandomDate<T extends string | number>(min: T, max: T): Date[] {
    return [d(Math.random() * (t(max) - (t(min) + ((t(max)-t(min))/2))) + (t(min) + ((t(max)-t(min))/2))),
            d(Math.random() * ((t(max) - ((t(max)-t(min))/2)) - t(min)) + (t(min)))]
}
