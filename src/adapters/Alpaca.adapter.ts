import { JsonAlpaca, ResultAlpaca } from "../models/utils/ResultAlpaca"

function redondar(numero: number, decimales: number) {
    const factor = Math.pow(10, decimales)
    return Math.round(numero * factor) / factor
}

export function adapterJsonToResultAlpaca(json: JsonAlpaca): ResultAlpaca {
    
    const result: ResultAlpaca = {
        close: redondar(json.c, 2),
        high: redondar(json.h, 2),
        low: redondar(json.l, 2),
        numberOfTrades: redondar(json.n, 2),
        open: redondar(json.o, 2),
        timestamp: new Date(json.t),
        volume: redondar(json.v, 2),
        volumeWeightedAveragePrice: redondar(json.vw, 2),
        symbol: json.s
    }
    return result
}