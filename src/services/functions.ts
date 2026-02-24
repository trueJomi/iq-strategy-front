import { ContextFromIndividualModel, ContextPrediction, DataFromModel } from './../models/utils/dataModel';
import { DEV_MODE } from "../constants/env.constant";
import { app } from "../constants/firebase.constant";
import { getFunctions, connectFunctionsEmulator, httpsCallableFromURL} from 'firebase/functions'
import { getHistoricalData } from './alpacaService';
import { EIntervalo } from '../models/utils/Intervalo.model';
import { Predictions } from '../models/utils/Predictions';

const funtions = getFunctions(app)

if (DEV_MODE) {
    connectFunctionsEmulator(funtions, 'localhost', 5000)
}

export async function sendMessage( data: DataFromModel<ContextFromIndividualModel>) {
    const historical = await getHistoricalData(data.data.currentAction.id, EIntervalo.UN_MES)
    data.data.history = historical
    const fun = httpsCallableFromURL(funtions, 'http://localhost:5000/iq-strategy/us-central1/sendMessage')
    const result = await fun(data)
    const { response } = result.data as  { response: string }
    return response
}

export async function getPrediction(data: ContextPrediction) { 
    const historical = await getHistoricalData(data.action.id, EIntervalo.UN_MES)
    data.history = historical
    const fun = httpsCallableFromURL(funtions, 'http://localhost:5000/iq-strategy/us-central1/getPredcitions')
    const result = await fun(data)
    const { response } = result.data as { response: Predictions[] }
    return response
}