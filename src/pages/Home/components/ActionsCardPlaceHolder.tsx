import { Box, Card, CardContent, Typography } from '@mui/material'

function CardPlaceholder() {
    return (
        <Card
        className='animation-pulse'
        sx={{
            minWidth: '10rem',
            height: '6rem',
            display: 'flex',
            backgroundColor: 'grey.300',
            color: 'grey.500',
            alignItems: 'center',
        }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Box>
                    <Typography 
                        component='div'
                        sx={{ width: '4rem', backgroundColor: 'grey.400', height: '1rem' }}>
                    </Typography>
                    <Typography 
                        component='div'
                        sx={{ width: '4rem', backgroundColor: 'grey.400', height: '1rem', marginTop:1 }}>
                    </Typography>
                </Box>
                <Typography
                    component='div'
                    sx={{ width: '3rem', backgroundColor: 'grey.400', height: '3rem' }}>
                </Typography>
            </CardContent>
        </Card>
    )
}

function ActionCardPlaceholder() {
    const cant = [1,2,3]
    return cant.map((index) => <CardPlaceholder key={index} />)
}

export default ActionCardPlaceholder