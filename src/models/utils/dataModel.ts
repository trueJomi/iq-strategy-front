import { Action } from "../action.model";
import { Folder } from "../forlder.model";
import { Predictions } from "./Predictions";
import { ResultAlpaca } from "./ResultAlpaca";

export interface ContextFromIndividualModel {
    currentAction: Folder
    history: ResultAlpaca[]
    predicions: Predictions[]
}

export interface ContextFromModel {
    forlders: Folder[]
    history: ResultAlpaca[]
    predicions: Predictions[]
}

export interface DataFromModel<T> {
    message: string
    estrategy: string
    data: T
}

export interface ContextPrediction {
    action: Action,
    history: ResultAlpaca[]
}