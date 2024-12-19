import { LoadingButton } from '@mui/lab'
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Link
} from '@mui/material'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../services/AuthService'

function FormRegister () {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

  const handleClick = (input: React.FormEvent<HTMLFormElement>): void => {
    input.preventDefault()
    const formData = new FormData(input.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passwordConfirm = formData.get('password-confirm') as string
    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    void register(email, password).then(() => {
      navigate('/')
      setLoading(false)
    }).catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setError(error.message)
      setLoading(false)
    })
  }
  return (
    <Stack onSubmit={handleClick} component='form' >
        <Stack spacing={3} >
          <TextField
            name="email"
            label="Email address" />
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
          <TextField
            name="password-confirm"
            label="Password Confirm"
            type={showPasswordConfirm ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }} edge="end">
                    {showPasswordConfirm ? <FaEye/> : <FaEyeSlash/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
        <Stack>
          {error !== undefined && <Typography variant="body2" color="error">{error}</Typography>}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link
            onClick={() => {
              navigate('/login')
            }}
          variant="subtitle2" underline="hover" sx={{ textDecoration: 'underline' }} >
            si tienes cuenta, Inicia Sesion
          </Link>
        </Stack>
        <LoadingButton
          fullWidth
          loading={loading}
          size="large"
          type="submit"
          variant='contained'
        >
          Register
        </LoadingButton>
      </Stack>
  )
}

export default FormRegister
