import { CardActionArea, CardContent, Typography } from "@mui/material"
import { MdMoreHoriz } from "react-icons/md"
import { useModalStore } from "../../../store/modal.store"

function MoreData() {
    const { setActionsOpen } = useModalStore((state) => state)
  return (
    <CardActionArea
        onClick={() => setActionsOpen(true)}
        sx={{
            color: 'primary.main',
        }}
    >
        <CardContent
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                alignItems: 'center',
                height: '5rem',
            }}
        >
            <MdMoreHoriz
                style={{
                    fontSize: '3rem',
                }}
            />
            <Typography variant="h5" component="h5">
                Todas
            </Typography>
        </CardContent>
    </CardActionArea>
  )
}

export default MoreData