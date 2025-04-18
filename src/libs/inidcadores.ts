import { ResultAlpaca } from "../models/utils/ResultAlpaca";

function calculateSMA(data: ResultAlpaca[], period: number) {
    const sma: number[] = []
    data.forEach((_, index) => {
        if (index < period - 1) {
            sma.push(NaN)
        } else {
            let sum = 0
            for (let j = index; j > index - period; j--) {
                sum += data[j].close
            }
            sma.push(sum / period)
        }
    });
    return sma
}

function calculateEMA(data: ResultAlpaca[], period: number) {
    const ema: number[] = []
    let multipler = 2 / (period + 1)
    data.forEach((item, index) => {
        if (index < period - 1) {
            ema.push(NaN)
        } else if (index === period - 1) {
            let sum = 0
            for (let j = index; j > index - period; j--) {
                sum += data[j].close
            }
            ema.push(sum / period)
        } else {
            ema.push((item.close - ema[index - 1]) * multipler + ema[index - 1])
        }

    });
    return ema

}

function calculateADX(data: ResultAlpaca[], period: number): number[] {
    const adx: number[] = [];
    const tr: number[] = [];
    const plusDM: number[] = [];
    const minusDM: number[] = [];
    const plusDI: number[] = [];
    const minusDI: number[] = [];
    const dx: number[] = [];

    for (let i = 1; i < data.length; i++) {
        const highDiff = data[i].high - data[i - 1].high;
        const lowDiff = data[i - 1].low - data[i].low;

        plusDM.push(highDiff > lowDiff && highDiff > 0 ? highDiff : 0);
        minusDM.push(lowDiff > highDiff && lowDiff > 0 ? lowDiff : 0);

        const trueRange = Math.max(
            data[i].high - data[i].low,
            Math.abs(data[i].high - data[i - 1].close),
            Math.abs(data[i].low - data[i - 1].close)
        );
        tr.push(trueRange);
    }

    let sumTR = 0;
    let sumPlusDM = 0;
    let sumMinusDM = 0;

    for (let i = 0; i < period; i++) {
        sumTR += tr[i];
        sumPlusDM += plusDM[i];
        sumMinusDM += minusDM[i];
    }

    plusDI.push((sumPlusDM / sumTR) * 100);
    minusDI.push((sumMinusDM / sumTR) * 100);

    for (let i = period; i < tr.length; i++) {
        sumTR = sumTR - tr[i - period] + tr[i];
        sumPlusDM = sumPlusDM - plusDM[i - period] + plusDM[i];
        sumMinusDM = sumMinusDM - minusDM[i - period] + minusDM[i];

        plusDI.push((sumPlusDM / sumTR) * 100);
        minusDI.push((sumMinusDM / sumTR) * 100);
    }

    for (let i = 0; i < plusDI.length; i++) {
        const diDiff = Math.abs(plusDI[i] - minusDI[i]);
        const diSum = plusDI[i] + minusDI[i];
        dx.push((diDiff / diSum) * 100);
    }

    let sumDX = 0;
    for (let i = 0; i < period; i++) {
        sumDX += dx[i];
    }

    adx.push(sumDX / period);

    for (let i = period; i < dx.length; i++) {
        sumDX = (adx[adx.length - 1] * (period - 1) + dx[i]) / period;
        adx.push(sumDX);
    }

    return adx;
}

function calculateRSI(data: ResultAlpaca[], period: number): number[] {
    const rsi: number[] = [];
    const gains: number[] = [];
    const losses: number[] = [];

    for (let i = 1; i < data.length; i++) {
        const change = data[i].close - data[i - 1].close;
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? Math.abs(change) : 0);
    }

    let averageGain = 0;
    let averageLoss = 0;

    for (let i = 0; i < period; i++) {
        averageGain += gains[i];
        averageLoss += losses[i];
    }

    averageGain /= period;
    averageLoss /= period;

    let rs = averageGain / averageLoss;
    rsi.push(100 - 100 / (1 + rs));

    for (let i = period; i < gains.length; i++) {
        averageGain = (averageGain * (period - 1) + gains[i]) / period;
        averageLoss = (averageLoss * (period - 1) + losses[i]) / period;

        rs = averageGain / averageLoss;
        rsi.push(100 - 100 / (1 + rs));
    }

    // Alinear el array RSI con los datos originales
    // Agregar NaN para los primeros valores donde no se puede calcular RSI
    for (let i = 0; i < period; i++) {
        rsi.unshift(NaN);
    }

    return rsi;
}

function calculateOBV(data: ResultAlpaca[]): number[] {
    const obv: number[] = [];
    let obvValue = 0;

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            obv.push(0); // OBV inicial
        } else {
            if (data[i].close > data[i - 1].close) {
                obvValue += data[i].volume;
            } else if (data[i].close < data[i - 1].close) {
                obvValue -= data[i].volume;
            } // Si los precios son iguales, el OBV no cambia
            obv.push(obvValue);
        }
    }
    return obv;
}

function calculateVWAP(data: ResultAlpaca[]): number[] {
    const vwap: number[] = [];
    let cumulativePV = 0; // Suma acumulada de Precio x Volumen
    let cumulativeVolume = 0; // Suma acumulada de Volumen

    for (let i = 0; i < data.length; i++) {
        const typicalPrice = (data[i].high + data[i].low + data[i].close) / 3;
        const pv = typicalPrice * data[i].volume;
        cumulativePV += pv;
        cumulativeVolume += data[i].volume;
        vwap.push(cumulativePV / cumulativeVolume);
    }

    return vwap;
}

function calculateBollingerBands(
    data: ResultAlpaca[],
    period: number,
    multiplier: number = 2
): { middleBand: number[]; upperBand: number[]; lowerBand: number[] } {
    const middleBand: number[] = [];
    const upperBand: number[] = [];
    const lowerBand: number[] = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            middleBand.push(NaN);
            upperBand.push(NaN);
            lowerBand.push(NaN);
        } else {
            // Calcular SMA
            let sum = 0;
            for (let j = i; j > i - period; j--) {
                sum += data[j].close;
            }
            const sma = sum / period;
            middleBand.push(sma);

            // Calcular Desviación Estándar
            let varianceSum = 0;
            for (let j = i; j > i - period; j--) {
                varianceSum += Math.pow(data[j].close - sma, 2);
            }
            const variance = varianceSum / period;
            const standardDeviation = Math.sqrt(variance);

            // Calcular Bandas Superior e Inferior
            upperBand.push(sma + multiplier * standardDeviation);
            lowerBand.push(sma - multiplier * standardDeviation);
        }
    }

    return { middleBand, upperBand, lowerBand };
}


function calculateATR(data: ResultAlpaca[], period: number): number[] {
    const atr: number[] = [];
    const tr: number[] = [];

    for (let i = 1; i < data.length; i++) {
        const high = data[i].high;
        const low = data[i].low;
        const closePrev = data[i - 1].close;

        const trValue = Math.max(
            high - low,
            Math.abs(high - closePrev),
            Math.abs(low - closePrev)
        );

        tr.push(trValue);
    }

    // Calcular el ATR inicial como el promedio de los primeros 'period' TR
    let sumTR = 0;
    for (let i = 0; i < period; i++) {
        sumTR += tr[i];
    }
    atr[period - 1] = sumTR / period;

    // Calcular el ATR para los períodos siguientes
    for (let i = period; i < tr.length; i++) {
        atr[i] = ((atr[i - 1] * (period - 1)) + tr[i]) / period;
    }

    // Alinear el array 'atr' con los datos originales
    // Agregar NaN para los primeros valores donde no se puede calcular ATR
    for (let i = 0; i < period; i++) {
        atr.unshift(NaN);
    }

    return atr;
}

function calculateIchimoku(data: ResultAlpaca[]): {
    tenkanSen: number[];
    kijunSen: number[];
    senkouSpanA: number[];
    senkouSpanB: number[];
    chikouSpan: number[];
} {
    const tenkanSenPeriod = 9;
    const kijunSenPeriod = 26;
    const senkouSpanBPeriod = 52;
    const displacement = 26;

    const tenkanSen: number[] = [];
    const kijunSen: number[] = [];
    const senkouSpanA: number[] = [];
    const senkouSpanB: number[] = [];
    const chikouSpan: number[] = [];

    // Calcular Tenkan-sen
    for (let i = 0; i < data.length; i++) {
        if (i < tenkanSenPeriod - 1) {
            tenkanSen.push(NaN);
        } else {
            const periodData = data.slice(i - tenkanSenPeriod + 1, i + 1);
            const highestHigh = Math.max(...periodData.map(d => d.high));
            const lowestLow = Math.min(...periodData.map(d => d.low));
            tenkanSen.push((highestHigh + lowestLow) / 2);
        }
    }

    // Calcular Kijun-sen
    for (let i = 0; i < data.length; i++) {
        if (i < kijunSenPeriod - 1) {
            kijunSen.push(NaN);
        } else {
            const periodData = data.slice(i - kijunSenPeriod + 1, i + 1);
            const highestHigh = Math.max(...periodData.map(d => d.high));
            const lowestLow = Math.min(...periodData.map(d => d.low));
            kijunSen.push((highestHigh + lowestLow) / 2);
        }
    }

    // Calcular Senkou Span A y desplazar 26 períodos hacia adelante
    for (let i = 0; i < data.length; i++) {
        if (i < kijunSenPeriod - 1) {
            senkouSpanA.push(NaN);
        } else {
            const value = (tenkanSen[i] + kijunSen[i]) / 2;
            senkouSpanA.push(value);
        }
    }
    for (let i = 0; i < displacement; i++) {
        senkouSpanA.unshift(NaN);
    }

    // Calcular Senkou Span B y desplazar 26 períodos hacia adelante
    for (let i = 0; i < data.length; i++) {
        if (i < senkouSpanBPeriod - 1) {
            senkouSpanB.push(NaN);
        } else {
            const periodData = data.slice(i - senkouSpanBPeriod + 1, i + 1);
            const highestHigh = Math.max(...periodData.map(d => d.high));
            const lowestLow = Math.min(...periodData.map(d => d.low));
            senkouSpanB.push((highestHigh + lowestLow) / 2);
        }
    }
    for (let i = 0; i < displacement; i++) {
        senkouSpanB.unshift(NaN);
    }

    // Calcular Chikou Span (precio de cierre desplazado 26 períodos hacia atrás)
    for (let i = 0; i < data.length; i++) {
        if (i - displacement >= 0) {
            chikouSpan.push(data[i - displacement].close);
        } else {
            chikouSpan.push(NaN);
        }
    }

    return {
        tenkanSen,
        kijunSen,
        senkouSpanA,
        senkouSpanB,
        chikouSpan
    };
}

function calculateMFI(data: ResultAlpaca[], period: number): number[] {
    const mfi: number[] = [];
    const typicalPrices: number[] = [];
    const positiveMoneyFlow: number[] = [];
    const negativeMoneyFlow: number[] = [];

    // Calcular el Precio Típico para cada período
    for (let i = 0; i < data.length; i++) {
        const typicalPrice = (data[i].high + data[i].low + data[i].close) / 3;
        typicalPrices.push(typicalPrice);
    }

    // Calcular el Flujo de Dinero Positivo y Negativo
    for (let i = 1; i < data.length; i++) {
        const moneyFlow = typicalPrices[i] * data[i].volume;
        if (typicalPrices[i] > typicalPrices[i - 1]) {
            positiveMoneyFlow.push(moneyFlow);
            negativeMoneyFlow.push(0);
        } else if (typicalPrices[i] < typicalPrices[i - 1]) {
            positiveMoneyFlow.push(0);
            negativeMoneyFlow.push(moneyFlow);
        } else {
            positiveMoneyFlow.push(0);
            negativeMoneyFlow.push(0);
        }
    }

    // Calcular el MFI
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            mfi.push(NaN);
        } else {
            const posFlowSum = positiveMoneyFlow.slice(i - period, i).reduce((a, b) => a + b, 0);
            const negFlowSum = negativeMoneyFlow.slice(i - period, i).reduce((a, b) => a + b, 0);
            const moneyFlowRatio = negFlowSum === 0 ? 0 : posFlowSum / negFlowSum;
            const mfiValue = 100 - (100 / (1 + moneyFlowRatio));
            mfi.push(mfiValue);
        }
    }

    // Alinear el array MFI con los datos originales
    mfi.unshift(NaN); // Ajustar por el inicio en el índice 1

    return mfi;
}

// Ejemplo de uso
const historicalData: ResultAlpaca[] = [
    // Agrega datos históricos aquí
];
