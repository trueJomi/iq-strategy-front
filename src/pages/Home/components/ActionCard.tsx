import { useSearchParams } from 'react-router-dom'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import { Action } from '../../../models/action.model'
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { useModalStore } from '../../../store/modal.store'
import { usePredictionsStore } from '../../../store/predictions.store'

interface Props {
    action: Action
    selected?: boolean
}

function ActionCard({ action, selected }: Props) {
    const [, setSearchParams] = useSearchParams()
    const { setPredictions } = usePredictionsStore(state => state)
    const { setActionsOpen } = useModalStore((state) => state)

  return (
    <Card
        sx={{
            height: '6rem',
            display: 'flex',
            backgroundColor: selected ? 'primary.main' : 'primary.contrastText',
            color: selected ? 'background.paper' : 'text.primary',
            alignItems: 'center',
        }}
    >
        <CardActionArea
            onClick={() => {
                setSearchParams((currentState) => {
                    const search = new URLSearchParams(currentState)
                    search.set('action', action.id)
                    return search
                })
                setPredictions([])
                setActionsOpen(false)
            }}
            sx={{
                height: '6rem',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography variant="h6" component="div">
                        {action.name}
                    </Typography>
                    {action.price !== undefined ?
                        <Typography fontWeight='fontWeightBold' variant="h5" component="div">
                            ${adapterNumberString(action.price)}
                        </Typography>
                        : <Typography
                            className='animation-pulse'
                            component='div'
                            sx={{ width: '4rem', backgroundColor: 'grey.400', height: '1rem', marginTop:1 }}>
                            </Typography>
                    }
                </Box>
                <CardMedia
                    sx={{
                        maxHeight: '3rem',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        width: 'auto',
                        height:'auto',
                        maxWidth: '3rem',
                    }}
                    className='image-sahdow'
                    component='img'
                    image={action.image}
                    alt={action.name+' logo'}
                />
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default ActionCard