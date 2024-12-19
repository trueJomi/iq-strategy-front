import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { MdMenu, MdLogout, MdBarChart } from 'react-icons/md'
import { type LayoutNav } from '../models/utils/Layout.model'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../services/AuthService'
import { useActionStore } from '../store/action.store'
import { getActions } from '../services/actionService'
import { getCurrentPrice, getDataModel } from '../services/alpacaService'
import { getFolders } from '../services/folderService'
import { useFolderStore } from '../store/folder.store'

const drawerWidth = 220

interface Props {
  routes: LayoutNav[]
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children, routes }) => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { setFolders }= useFolderStore((state) => state)
  const { actions, setActions, currentAction, setBarsData } = useActionStore((state) => state)
  // const [ isPredict, setIsPRedict] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  React.useEffect(() => {
    if (actions === undefined) return
    getFolders(actions,setFolders)
  },[actions, setFolders])

  React.useEffect(() => {
    getActions().then((data) => {
      setActions(data)
    }).catch((error) => {
      console.error(error)
    })
  },[setActions])

  React.useEffect(() => {
    if (actions === undefined) return
    if (actions.some((action) => action.price !== undefined)) return
    getCurrentPrice(actions.map((action) => action.id)).then((data) => {
      const newActions = actions.map((action) => {
        const price = data.find((price) => price.symbol === action.id)
        return {
          ...action,
          price: price?.close
        }
      })
      setActions(newActions)
    }).catch((error) => {
      console.error(error)
    })
  },[actions, setActions])

  React.useEffect(() => {
    if (currentAction === undefined) return
    getDataModel(currentAction.id).then((data) => {
      setBarsData(data)
    })
  },[currentAction, setBarsData])

  const drawer = (
    <div>
      <div>
        <MdBarChart
          style={{ 
            cursor: 'pointer',
            fontSize: '4rem',
            marginTop: '.5rem',
            marginLeft: '4rem',
            marginBottom: '.5rem'
          }}
        />
      </div>
      <Divider />
      <List>
        {routes.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
                selected={window.location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5
                }}
                onClick={ () => {
                  navigate(item.path)
                  setMobileOpen(false)
                  window.scrollTo(0, 0)
                } }
              >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                }}
                className='!text-white' >
                <item.icon style={{
                  fontSize: '1.5rem'
                }} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
            <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5
                }}
                onClick={ () => { void logOut() } }
              >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                }}
                className='!text-white' >
                  <MdLogout style={{
                  fontSize: '1.5rem'
                }}/>
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesion" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: 'primary.contrastText', 
              mr: 2,
              display: { md: 'none' } }}
          >
            <MdMenu
              style={{
                fontSize: '1.rem'
              }}
            />
          </IconButton>
          <MdBarChart
            onClick={() => { navigate('/', { preventScrollReset:true }) }}
            style={{ 
              cursor: 'pointer',
              fontSize: '3rem',
            }}
            />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width:{ md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100dvh',
          backgroundColor: 'background.paper',
        }
        }
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
