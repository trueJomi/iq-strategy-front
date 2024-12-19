export interface JsonAlpaca {
    c: number
    h: number
    l: number
    n: number
    o: number
    t: string
    v: number
    vw: number
    s: string
}

export interface ResultAlpaca {
    close: number
    high: number
    low: number
    numberOfTrades: number
    open: number
    timestamp: Date
    volume: number
    volumeWeightedAveragePrice: number
    symbol: string
}