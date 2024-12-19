import { LoadingButton } from '@mui/lab'
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../../services/AuthService'

function FormLogin () {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClick = (input: React.FormEvent<HTMLFormElement>): void => {
    input.preventDefault()
    setLoading(true)
    const formData = new FormData(input.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    void logIn(email, password).then(() => {
      navigate('/')
      setLoading(false)
    }).catch((err) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setError(err.message)
      setLoading(false)
    })
  }
  return (
    <Stack onSubmit={handleClick} component='form' >
        <Stack spacing={3} >
          <TextField name="email" label="Email address"/>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => { setShowPassword(!showPassword) }} edge="end">
                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
        <Stack sx={{ my: 2}} >
          {error !== undefined && <Typography variant="body2" color="error">{error}</Typography>}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
            <a onClick={() => {
              navigate('/register')
            }} style={{
              fontStyle: 'italic',
              cursor: 'pointer'
            }}>
              no  tienes cuenta, Registrate?
            </a>
        </Stack> */}
        <LoadingButton
          fullWidth
          loading={loading}
          size="large"
          type="submit"
          variant='contained'
        >
          Login
        </LoadingButton>
      </Stack>
  )
}

export default FormLogin
