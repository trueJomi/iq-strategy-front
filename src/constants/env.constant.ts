export const DEV_MODE = import.meta.env.VITE_DEV_MODE === "true"
export const ENV_API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
export const ENV_ALPACA_API_KEY_ID = import.meta.env.VITE_ALPACA_API_KEY_ID ?? ''
export const ENV_ALPACA_API_SECRET_KEY = import.meta.env.VITE_ALPACA_API_SECRET_KEY ?? ''
