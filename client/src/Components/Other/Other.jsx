import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Line from '@mui/icons-material/LineStyle';
import Fault from '@mui/icons-material/DangerousOutlined';
import Worker from '@mui/icons-material/EngineeringOutlined';
import Machine from '@mui/icons-material/MicrowaveOutlined';
import MachineType from '@mui/icons-material/AccountTreeOutlined';
import Users from '@mui/icons-material/SupervisedUserCircleOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Outlet, Link, NavLink } from 'react-router-dom'
import src from '../assets/WiMetrix.png'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import './other.css'
import {  arrowTypeGraphy, drawerNavlink, outletBox,styles } from './otherStyleSheet'
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';



// const drawerWidth = 240;

export default function PermanentDrawerLeft() {

    const navigate = useNavigate()

    const [date, setdate] = React.useState(new Date());
    const [open, setopen] = React.useState(true);
    const [drawerWidth, setdrawerWidth] = React.useState(240);
    const showClick = () => {
        setopen(!open)
        setdrawerWidth(ps => (drawerWidth === 240 ? 0 : 240))
    }
    const refreshClock = () => {
        setdate(new Date())
    }

    const menuItems = [
        { name: "Users", link: "/main/user", icon: <Users /> },
        { name: "Fault", link: "/main/fault", icon: <Fault /> },
        { name: "Line", link: "/main/line", icon: <Line /> },
        { name: "Machine", link: "/main/machine", icon: <Machine /> },
        { name: "Machine Type", link: "/main/machineType", icon: <MachineType /> },
        { name: "Workers", link: "/main/worker", icon: <Worker /> },
    ]

    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    React.useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar

                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,...styles.appBar}}
            >
                <Toolbar sx={styles.toolBarInAppBar}>
                    <Typography color="white"
                        sx={arrowTypeGraphy}
                        onClick={showClick}>
                        {
                            open ? <ArrowBackIosNewOutlinedIcon fontSize='5px' /> : <ArrowForwardIosOutlinedIcon fontSize='5px' />
                        }
                    </Typography>
                    <Typography variant="h6" noWrap component="div" >
                        <div >
                            <img src={src} alt="" height="35px" />
                        </div>
                    </Typography>
                    <Typography color="#785EE0" sx={styles.rightContainerInAppBar} >
                            <WbSunnyIcon />
                            <div style={styles.timeContainer} >
                                <p style={styles.timerPara}>{date.toLocaleTimeString()}</p>
                                <p style={styles.datePara}>{date.toLocaleDateString()}</p>
                            </div>
                            <div style={styles.userInfoContainer} >
                                 <p style={styles.userNamePara}>{JSON.parse(localStorage.getItem('user')).UserName}</p>
                                 <p style={styles.userTypePara}>{JSON.parse(localStorage.getItem('user')).UserType}</p>
                             </div>
                            <div style={styles.userAvatar} >
                                {JSON.parse(localStorage.getItem('user')).UserName.charAt(0)}
                            </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Toolbar sx={{
                    // borderRight: '2px solid #785EE0',
                    borderRight: '1px solid rgba(187, 187, 187, 0.5)',
                }} >
                    <Logo primary='rgba(120, 94, 224, 0.5)' secondary='#785EE0' />
                </Toolbar>
                <Divider />
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem key={index} disablePadding>
                            <NavLink key={index} to={text.link}
                                style={drawerNavlink}
                            // style={{ width: '100%', height: '100%', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        {
                                            text.icon
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text.name} />

                                </ListItemButton>
                            </NavLink>

                        </ListItem>
                    ))}
                </List>
                {/* <Divider /> */}
                <List sx={{ bottom: 0, position: 'absolute', left: 0, width: '100%' }}>
                    <Divider />
                    <ListItem onClick={logOut} sx={{ paddingLeft: '0px', paddingRight: '0px' }} >
                        <ListItemButton>
                            <ListItemIcon><LogoutIcon color='error' /></ListItemIcon>
                            <ListItemText><span style={{ fontFamily: "'Orbitron', sans-serif", color: 'red', fontWeight: '700' }}>LOG OUT</span></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={outletBox}
            >
                <div style={{ padding: '10px' }} >
                    <Outlet />
                </div>
            </Box>

        </Box>
    );
}
