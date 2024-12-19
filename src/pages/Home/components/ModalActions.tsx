import { Box, Fade, Modal, SxProps } from '@mui/material';
import { useModalStore } from '../../../store/modal.store';
import { useActionStore } from '../../../store/action.store';
import ActionCard from './ActionCard';
import { Theme } from '@emotion/react';

const style: SxProps<Theme> = {
    position: 'absolute',
    display: 'grid',
    top: '50%',
    left: '50%',
    gap: '1rem',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
  };

function ModalActions() {
    const { actionsOpen, setActionsOpen } = useModalStore( state => (state))
    const { actions } = useActionStore()
    const handleClose = () => setActionsOpen(false);

    return (
        <Modal
            open={actionsOpen}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={actionsOpen}>
                <Box sx={style}>
                    {actions?.map(action => (
                        <ActionCard key={action.id} action={action} />
                    ))}
                </Box>
            </Fade>
      </Modal>
  )
}

export default ModalActions