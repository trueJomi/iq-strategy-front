import { Card, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useActionStore } from '../../store/action.store'
import { getHistorial } from '../../services/transactionService'
import { Transaction } from '../../models/Transactions.model'
import CardTransactions from './components/CardTransactions'
import { useFolderStore } from '../../store/folder.store'

function HistoryPage() {
    const { actions } = useActionStore((state) => state)
    const { folders } = useFolderStore((state) => state)
    const [historial, setHistorial] = useState<Transaction[]>()

    useEffect(() => {
        if (actions === undefined) return
        getHistorial(actions, setHistorial)
    },[actions])
    return (
        <Container
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 3,
            }}
        >
            <Stack spacing={3} >
                {historial?.map((transaction) => (
                    <CardTransactions key={transaction.id} transaction={transaction} />
                ))}
            </Stack>
            <Card style={{
                padding: 20,
                
            }} >
                <Typography variant="h4" >Folders</Typography>
                <Stack spacing={3} >
                    {folders?.map((folder) => (
                        <div style={{ display: "flex", gap: 20 }} >
                            <div style={{ width: "200px" }} >
                                <img style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain',
                                }}  src={folder.action.image} alt={folder.action.name} />
                                <h1>{folder.action.name}</h1>
                            </div>
                            <div>
                                <h2>{folder.countActions}</h2>
                                <h2>{folder.totalValue}</h2>
                            </div>
                        </div>
                    ))}
                </Stack> 
            </Card>
        </Container>
    )
}

export default HistoryPage
