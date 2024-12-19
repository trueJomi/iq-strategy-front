import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { chatStore } from '../../../store/chat.store'
import { useStrategyStore } from '../../../store/strategy.store'

function MessagesView() {
    const { messages, setStrategy } = chatStore(state => state)
    const { strategys } = useStrategyStore(state => state)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStrategy(event.target.value)
    }

    return (
        <Box>
            <TextField
                fullWidth
                type='text'
                name='prompt'
                select
                defaultValue='wyckoff'
                onChange={handleChange}
                id= 'prompt'
                label='Escribe una frase'
                sx={{ mx: 1 }}
            >
                {strategys.map((strategy) => (
                    <MenuItem key={strategy.id} value={strategy.id}>
                        {strategy.name}
                    </MenuItem>
                ))}
            </TextField>
            <Stack
                sx={{
                height: '30rem',
                overflow: 'auto',
                p: 2,
                }}
                paddingY={2} spacing={2}>
                {messages.map((message, index) => (
                <Box key={index} sx={{ 
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                    }}
                >  
                    <Box 
                    sx={{ 
                        p: 1,
                        bgcolor: message.type === 'user' ? 'primary.main' : 'secondary.main',
                        color: 'white',
                        fontSize: '1.05rem',
                        minWidth: '7rem',
                        borderRadius: 1,
                        maxWidth: '50%'
                    }}>
                    <div
                        style={{
                            display: 'grid'                          
                        }}
                    >
                        {
                            message.action &&
                            <div
                                style={{
                                    fontSize: '.8rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                <img
                                style={{
                                    borderRadius: '.1rem',
                                    maxHeight: '1rem',
                                    marginRight: '.5rem'
                                }}
                                src={message.action.image} alt={message.action.id}/>
                                {message.action.id}
                            </div>
                        }
                        {message.text}
                    </div>
                    </Box>
                </Box>
                ))}
            </Stack>
        </Box>
  )
}

export default MessagesView