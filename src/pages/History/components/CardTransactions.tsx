import { Card, CardContent, Typography } from "@mui/material"
import { Transaction } from "../../../models/Transactions.model"

const optionsDate: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }

interface Props {
    transaction: Transaction
}

function CardTransactions({ transaction } : Props) {
  return (
    <Card
      sx={{
        maxWidth: 700
      }}
    >
        <CardContent>
            <Typography variant='h4'>
              {transaction.action.name}
            </Typography>
            <Typography variant='h3'>
              {transaction.value}
            </Typography>
            <Typography variant='h5'>
              {transaction.value >0? '+' : '-'}{transaction.amount}
            </Typography>
            <p>{transaction.date.toLocaleDateString('es-PE', optionsDate)}</p>
        </CardContent>
    </Card>
  )
}

export default CardTransactions