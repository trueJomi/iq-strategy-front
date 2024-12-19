import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth.hook'
import Router from './Router'
import { createTheme, ThemeProvider } from '@mui/material'
import { grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
      contrastText: '#fff'
    },
    secondary: {
      main: grey[900],
      contrastText: '#fff'
    }
  }
})

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme} >
          <Router/>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
