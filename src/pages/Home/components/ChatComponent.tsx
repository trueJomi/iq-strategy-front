import { Box } from '@mui/material'
import InputChat from './InputChat'
import MessagesView from './MessagesView'

function ChatComponent() {

  return (
    <Box sx={{
      gridArea: 'chat',
    }}>
      <MessagesView/>
      <InputChat/>
    </Box>
  )
}

export default ChatComponent