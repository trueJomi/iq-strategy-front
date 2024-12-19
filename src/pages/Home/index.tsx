import { useEffect, useMemo, useState } from "react"
import ActionsHeader from "./components/ActionsHeader"
import { useSearchParams } from "react-router-dom"
import { DEFAULT_ACTION } from "../../constants/actions.constant"
import { useActionStore } from "../../store/action.store"
import ModalActions from "./components/ModalActions"
import GraficCompoent from "./components/GraficCompoent"
import BuySellComponet from "./components/BuySellComponet"
import BuySellModal from "./components/BuySellModal"
import ChatComponent from "./components/ChatComponent"
import { Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"

function HomePage () {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ width, setWidth ]= useState<number>(window.innerWidth)
  const view: "grafico" | "chat" = useMemo(() => {
    if (width >= 1100) return 'grafico'
    return searchParams.get('tab') as "grafico" | "chat" ?? 'grafico'
  }, [width, searchParams])

  const { actions, setCurrentAction } = useActionStore((state) => state)
  
  const current = useMemo(() => {
    const currentActionId = searchParams.get('action') ?? DEFAULT_ACTION
    if (actions === undefined) return
    const currentAction = actions?.find((action) => action.id === currentActionId)
    return currentAction
  },[actions, searchParams])

  const changeTab = (_: React.SyntheticEvent, newValue: string) => {
    setSearchParams((currentState) => {
      const search = new URLSearchParams(currentState)
      search.set('tab', newValue)
      return search
    })
  }

  useEffect(() => {
    setCurrentAction(current)
  }, [current, setCurrentAction])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }, [])

  return (
    <>
      <BuySellComponet/>
      <ActionsHeader acctions={actions} current={current} />
      <TabContext value={view} >
        {
          width <= 1100
          &&  <TabList onChange={changeTab} >
                <Tab
                  label='grafico'
                  value='grafico'
                />
                <Tab
                  label='chat'
                  value='chat'  
                />
              </TabList>
        }
        <TabPanel value="grafico" >
          <div className="two-frames" >
            <GraficCompoent current={current} />
            {
              width >= 1100 
              && <ChatComponent/>
            }
          </div>
        </TabPanel>
        <TabPanel value="chat" >
          <ChatComponent/>
        </TabPanel>
      </TabContext>
      <ModalActions/>
      <BuySellModal/>
    </>
  )
}

export default HomePage
