import { Stack, SxProps, Theme, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { EIntervalo } from "../../../models/utils/Intervalo.model"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

const styleProp: SxProps<Theme> = {
    fontSize: 10,
    padding: .7,
}

function SelectTime() {
    const [searchParams, setSearchParams] = useSearchParams()

    const interval = useMemo(() => {
        const interval = searchParams.get('interval') as EIntervalo ?? EIntervalo.UN_MES
        return interval
      }, [searchParams])
    
    const handleInterval = (_: React.MouseEvent<HTMLElement>,
        newAlignment: EIntervalo) => {
        setSearchParams((currentState) => {
          const search = new URLSearchParams(currentState)
          search.set('interval', newAlignment)
          return search
        })
      }

    return (
        <Stack spacing={5}>
            <ToggleButtonGroup value={interval} exclusive onChange={handleInterval}>
            <ToggleButton sx={styleProp}  value={EIntervalo.HOY} key={EIntervalo.HOY}>
                hoy
            </ToggleButton>
            <ToggleButton sx={styleProp} value={EIntervalo.TRES_DIAS} key={EIntervalo.TRES_DIAS}>
                3 dias
            </ToggleButton>
            <ToggleButton sx={styleProp} value={EIntervalo.UNA_SEMANA} key={EIntervalo.UNA_SEMANA}>
                semana
            </ToggleButton>
            <ToggleButton sx={styleProp} value={EIntervalo.UN_MES} key={EIntervalo.UN_MES}>
                mes
            </ToggleButton>
            <ToggleButton sx={styleProp} value={EIntervalo.SEIS_MESES} key={EIntervalo.SEIS_MESES}>
                6 meses
            </ToggleButton>
            <ToggleButton sx={styleProp} value={EIntervalo.UN_ANO} key={EIntervalo.UN_ANO}>
                año
            </ToggleButton>
            <ToggleButton sx={styleProp} value={EIntervalo.CINCO_ANOS} key={EIntervalo.CINCO_ANOS}>
                5 años
            </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )
}

export default SelectTime