import { useMemo } from "react"
import { Action } from "../../../models/action.model"
import ActionCard from "./ActionCard"
import ActionCardPlaceholder from "./ActionsCardPlaceHolder"
import MoreData from "./MoreData"
import { getItemsRandom } from "../../../libs/utils"

interface Props {
    acctions?: Action[]
    current?: Action
}

function ActionsHeader({ acctions, current }: Props) {
    const first4Actions = useMemo(() => {
        if (acctions === undefined) return
        if (current === undefined) return getItemsRandom(acctions)
        const noCurrent = acctions.filter((action) => action.id !== current.id)
        return getItemsRandom(noCurrent)
    },[acctions, current])

    const isAllData = useMemo(() => {
        return acctions !== undefined && current !== undefined
    }, [acctions, current])

    return ( 
        <div
            style={{
                gap: '1rem',
                paddingTop: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
                paddingBottom: '1rem',
            }}
        >
            {isAllData
            ?   <>
                    <ActionCard action={current!} selected />
                    {first4Actions!.map((action) => (
                        <ActionCard key={action.id} action={action} />
                    ))}
                </>
            : <ActionCardPlaceholder/>
            }
            <MoreData/>
        </div>
    )
}

export default ActionsHeader