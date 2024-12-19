import { Box, Button } from "@mui/material"
import { MdArrowDownward, MdArrowUpward } from "react-icons/md"
import { useBuySellStore } from "../../../store/modalCompra.store"

function BuySellComponet() {
    const  { setOpen } = useBuySellStore(state => state)
  return (
    <Box
        sx={{
            display: 'grid',
            rowGap: '.5rem',
            columnGap: '1rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))',
        }}
    >
        <Button
            onClick={() => setOpen(true, 'buy')}
            startIcon={<MdArrowUpward/>}
            color="success"
            variant="contained" fullWidth
        >
            Comprar
        </Button>
        <Button
            onClick={() => setOpen(true, 'sell')}
            startIcon={<MdArrowDownward/>}
            color="error"
            variant="contained" fullWidth
        >
            Vender
        </Button> 
    </Box>
  )
}

export default BuySellComponet