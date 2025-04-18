import { EIntervalo } from "../models/utils/Intervalo.model";
import { ENV_ALPACA_API_KEY_ID, ENV_ALPACA_API_SECRET_KEY } from "../constants/env.constant";
import { formatDate, transformDateToday } from "../libs/utils";
import { JsonAlpaca } from "../models/utils/ResultAlpaca";
import { adapterJsonToResultAlpaca } from "../adapters/Alpaca.adapter";

export function getIntervalTime(intervalo: EIntervalo) {
    const today = transformDateToday(new Date())
    switch (intervalo) {
        case EIntervalo.HOY:
            return {
                start_time: today,
                timeframe: '1H'
            }
        case EIntervalo.TRES_DIAS:
            today.setDate(today.getDate() - 3)
            return {
                start_time: today,
                timeframe: '2H'
            }
        case EIntervalo.UNA_SEMANA:
            today.setDate(today.getDate() - 7)
            return {
                start_time: today,
                timeframe: '6H'
            }
        case EIntervalo.UN_MES:
            today.setMonth(today.getMonth() - 1)
            return {
                start_time: today,
                timeframe: '1D'
            }
        case EIntervalo.SEIS_MESES:
            today.setMonth(today.getMonth() - 6)
            return {
                start_time: today,
                timeframe: '1D'
            }
        case EIntervalo.UN_ANO:
            today.setFullYear(today.getFullYear() - 1)
            return {
                start_time: today,
                timeframe: '1D'
            }
        case EIntervalo.CINCO_ANOS:
            today.setFullYear(today.getFullYear() - 5)
            return {
                start_time: today,
                timeframe: '1W'
            }
    }
}

const options: RequestInit = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': ENV_ALPACA_API_KEY_ID,
        'APCA-API-SECRET-KEY': ENV_ALPACA_API_SECRET_KEY
    }
}

function gnerateUrl(symbol: string | string[], start?: Date, timeframe?: string, limit?: number) {
    const url = new URL('https://data.alpaca.markets/v2/stocks/bars')
    url.searchParams.append('adjustment', 'raw')
    if (Array.isArray(symbol)) {
        url.searchParams.append('symbols', symbol.join(','))
    } else {
        url.searchParams.append('symbols', symbol)
    }
    if (start){
        url.searchParams.append('start', formatDate(start))
    }
    if (timeframe) {
        url.searchParams.append('timeframe', timeframe)
    }
    if (limit) {
        url.searchParams.append('limit', limit.toString())
    }
    return url
}

export async function getDataModel(symbol: string) {
    const today = transformDateToday(new Date())
    const timeframe ='1D'
    const url = gnerateUrl(symbol, today, timeframe)
    const response = await fetch(url, options)
    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }
    const { bars } = await response.json()
    const data: JsonAlpaca[] = bars[symbol].map((bar: JsonAlpaca) => {
        return {...bar , s: symbol}
    })
    const result = data.map(adapterJsonToResultAlpaca)
    return result
}


export async function getHistoricalData( symbol: string, intervalo: EIntervalo) {
    const { start_time, timeframe } = getIntervalTime(intervalo)
    const url = gnerateUrl(symbol, start_time, timeframe)
    const response = await fetch(url, options)
    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }
    const { bars } = await response.json()

    const data: JsonAlpaca[] = bars[symbol].map((bar: JsonAlpaca) => {
        return {...bar , s: symbol}
    }) 
    const result = data.map(adapterJsonToResultAlpaca)
    return result
}

export async function getCurrentPrice (symbols: string[]) {
    const thisDate = transformDateToday(new Date())
    const url = gnerateUrl(symbols, thisDate, '23H', symbols.length)
    const response = await fetch(url, options)
    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }
    // console.log("response", symbols)
    const { bars } = await response.json()
    // console.log( "test", bars)
    const data: JsonAlpaca[] = symbols.map(symbol =>{
        return {
            ...bars[symbol][0],
            s: symbol
        }
    })
    const result = data.map(adapterJsonToResultAlpaca)
    return result
}

export async function getPrice(symbol: string) {
    const thisDate = transformDateToday(new Date())
    const url = gnerateUrl(symbol, thisDate, '20H', 1)
    const response = await fetch(url, options)
    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }
    const { bars } = await response.json()
    const data: JsonAlpaca = {
        ...bars[symbol][0],
        s: symbol
    }
    return adapterJsonToResultAlpaca(data)
}