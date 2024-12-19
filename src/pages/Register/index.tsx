import {
  Box,
  Card,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import FormRegister from './components/FormRegister'

function RegisterPage () {
  return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
          <Box
          alignItems={'center'}
        >
          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420
              }}
            >
              <Typography variant="h5" className="text-center" >Register</Typography>
              <Divider sx={{ my: 3 }}/>
              <FormRegister/>
            </Card>
          </Stack>
        </Box>
      </div>
  )
}

export default RegisterPage
