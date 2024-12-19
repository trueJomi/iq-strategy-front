import { Box, TextField } from "@mui/material"
import { chatStore } from "../../../store/chat.store"
import { useEffect } from "react"
import { LoadingButton } from "@mui/lab"
import { MdSend } from "react-icons/md"
import { sendMessage } from "../../../services/functions"
import { useFolderStore } from "../../../store/folder.store"
import { useActionStore } from "../../../store/action.store"
import { Folder } from "../../../models/forlder.model"
import { usePredictionsStore } from "../../../store/predictions.store"

function InputChat() {
    const { addMessage, strategy, setLoading, loading } = chatStore(state => state)
    const { predictions } = usePredictionsStore(state => state)
    const { folders } = useFolderStore(state => state)
    const { currentAction, actions } = useActionStore(state => state)

    const sendCuento = (input: React.FormEvent<HTMLFormElement>) => {
        input.preventDefault()
        setLoading(true)
        const form = new FormData(input.currentTarget)
        const mesage = form.get('prompt') as string
        if (mesage === '') return
        addMessage({
            action: currentAction,
            text: mesage,
            type: 'user'
        })        
        let curretnFolder: Folder | undefined = folders?.find((folder) => folder.action.id === currentAction.id)
        if (curretnFolder === undefined) {
            curretnFolder = {
                action: currentAction,
                countActions: 0,
                totalValue: 0,
                id: ''
            } 
        }
        // setLoading(false)
        sendMessage({
            message: mesage,
            estrategy: strategy,
            data: {
                currentAction: curretnFolder,
                history: [],
                predicions: predictions
            }
        }).then((response) => {
            addMessage({
                action: currentAction,
                text: response,
                type: 'bot'
            })
            input.currentTarget.reset()
            setLoading(false)
        }).catch((error) => {
            console.error(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (currentAction === undefined || folders === undefined || actions === undefined) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    },[currentAction, folders, actions, setLoading])

    return (
        <Box onSubmit={sendCuento} sx={{ my: 1, display: 'flex', width: '100%' }} component='form' >
            <TextField
                fullWidth
                type='text'
                name='prompt'
                id= 'prompt'
                disabled={loading}
                label='Escribe una frase'
                sx={{ mx: 1 }}
            />
            <LoadingButton
                type='submit'
                disabled={loading}
                loading={loading}
                sx={{ width: 50, height: 50, my: 0.5, fontSize: 30, color: 'black' }} >
                <MdSend/>
            </LoadingButton>
        </Box>
    )
}

export default InputChat