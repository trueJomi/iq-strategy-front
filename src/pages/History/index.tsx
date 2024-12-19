import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useActionStore } from '../../store/action.store'
import { getHistorial } from '../../services/transactionService'
import { Transaction } from '../../models/Transactions.model'
import CardTransactions from './components/CardTransactions'

function HistoryPage() {
    const { actions } = useActionStore((state) => state)
    const [historial, setHistorial] = useState<Transaction[]>()

    useEffect(() => {
        if (actions === undefined) return
        getHistorial(actions, setHistorial)
    },[actions])
    return (
        <Stack spacing={3} >
            {historial?.map((transaction) => (
                <CardTransactions key={transaction.id} transaction={transaction} />
            ))}
        </Stack>
    )
}

export default HistoryPage
