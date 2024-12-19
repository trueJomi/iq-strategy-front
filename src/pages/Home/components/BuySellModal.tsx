import { Box, CardMedia, Fade, IconButton, Modal, SxProps, Theme, Typography } from "@mui/material"
import { useBuySellStore } from "../../../store/modalCompra.store"
import { useState } from "react";
import { useActionStore } from "../../../store/action.store";
import { MdAdd, MdRemove } from "react-icons/md";
import { adapterNumberRound2 } from "../../../adapters/Numbers.adapter";
import { LoadingButton } from "@mui/lab";
import { createTransaction } from "../../../services/transactionService";

const style: SxProps<Theme> = {
    position: 'absolute',
    display: 'grid',
    top: '50%',
    left: '50%',
    gap: '2rem',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
};

function BuySellModal() {
    const [ cant, setCant ] = useState<number>(1)
    const [ loading, setLoading ] = useState<boolean>(false)
    const { currentAction } = useActionStore(state => state)
    const { open, setOpen, mode } = useBuySellStore(state => state)
    const handleClose = () => {
        setOpen(false, mode)
        setCant(1)
    }

    const submit = () => {
        setLoading(true)
        if (currentAction === undefined) return
        createTransaction({
            action: currentAction,
            value: mode === 'buy'? cant : -cant,
            amount: currentAction.price?? 0,
            date: new Date(),
        }).then(() => {
            setLoading(false)
            handleClose()
        })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant='h4' sx={{ textAlign:'center' }} >
                        {mode === 'buy' ? 'Comprar' : 'Vender'} Acciones
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '5rem',
                    }}>
                        <CardMedia
                            component='img'
                            sx={{
                                objectFit: 'contain',
                                maxWidth: '5rem',
                                maxHeight: '5rem',
                            }}
                            image={currentAction?.image}
                            alt={currentAction?.name}
                        />
                    </Box>
                    <Box>
                        <Typography variant='h4' fontWeight='bold' sx={{ textAlign:'center' }} >
                            ${adapterNumberRound2((currentAction?.price ?? 0)*cant)} 
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <IconButton
                            onClick={() => setCant(cant - 1)}
                        >
                            <MdRemove/>
                        </IconButton>
                        <Typography variant='h4' fontWeight='bold'>
                            {cant}
                        </Typography>
                        <IconButton
                            onClick={() => setCant(cant + 1)}
                        >
                            <MdAdd/>
                        </IconButton>
                    </Box>
                    <LoadingButton
                        onClick={submit}
                        loading={loading}
                        fullWidth
                        color={mode === 'buy' ? 'success' : 'error'}
                        variant='contained'
                    >
                        {mode === 'buy' ? 'Comprar' : 'Vender'}
                    </LoadingButton>
                </Box>
            </Fade>
      </Modal>
    )
}

export default BuySellModal