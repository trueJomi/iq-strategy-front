import { Action } from "../models/action.model";

export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export const getItemsRandom = (array: Action[]) => {
    const items: Action[] = []
    let number = 2
    if(array.length <= 2) {
      number = array.length
    }
    while(items.length < number) {
      const index = Math.floor(Math.random() * array.length)
      const item = array[index]
      if(!items.includes(item)) {
        items.push(item)
      }
    }
    return items
}

export const transformDateToday = (date: Date, minus: number = 0) => {
  const dayOfWeek = date.getDay()
  if(dayOfWeek === 0) {
    date.setDate(date.getDate() - 2)
  } else if(dayOfWeek === 6) {
    date.setDate(date.getDate() - 1)
  }
  date.setHours(date.getHours() - minus)
  return date
}
