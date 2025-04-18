import { useEffect, useMemo, useState } from 'react'
import FinancialGrafic from './FinancialGrafic'
import { Action } from '../../../models/action.model'
import { useSearchParams } from 'react-router-dom'
import { getHistoricalData } from '../../../services/alpacaService'
import { EIntervalo } from '../../../models/utils/Intervalo.model'
import { ResultAlpaca } from '../../../models/utils/ResultAlpaca'
import SelectTime from './SelectTime'
import { getPrediction } from '../../../services/functions'
import PredictionGrafic from './PredictionGrafic'
import { usePredictionsStore } from '../../../store/predictions.store'

interface Props {
  current?: Action
}

function GraficCompoent({ current }: Props) {
  const [searchParams] = useSearchParams()
  // const [predictions, setPredictions] = useState<Predictions[]>()
  const [historicalData, setHistoricalData] = useState<ResultAlpaca[]>()
  const { predictions, setPredictions } = usePredictionsStore(state => state)
  const interval = useMemo(() => {
    const interval = searchParams.get('interval') as EIntervalo ?? EIntervalo.UN_ANO
    return interval
  }, [searchParams])

  useEffect(() => {
    if (current === undefined) return
    getHistoricalData(current.id, interval).then((data) => {
      setHistoricalData(data)
    }).catch((error) => {
      console.error(error.message)
    })
  }, [current, interval])

  useEffect(() => {
    if (current === undefined) return
    getPrediction({ action: current, history: [] }).then((data) => {
      setPredictions(data)
    })
  },[current, setPredictions] );

  return (
    <div style={{
      gridArea: 'grafic',
      height: '100%',
      width: '100%',
    }} >
      <div>
        {historicalData !==undefined
          ? <FinancialGrafic data={historicalData} />
          : <div>loading</div>
        }
        <h1>Prediccion en lo proximo 30 dias</h1>
        {predictions !==undefined
          ? <PredictionGrafic predictions={predictions} />
          : <div>loading</div>
        }
      </div>
      <SelectTime/>
    </div>
  )
}

export default GraficCompoent