import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, CssBaseline } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {

    const [auki, setAuki] = useState(false)

    return (
        <CssBaseline>
        <AppBar position="static" style={{backgroundColor: "#3f51b5"}}>
            <Toolbar variant="dense">
                <IconButton edge="start" style={{color: "white"}} onClick={() => setAuki(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer 
                    open={auki}
                    onClose={() => setAuki(false)}
                >
                    <List style={{width : "250px", margin: "30px 0px 5px 4px"}} onClick={() => setAuki(false)}>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Etusivulle" />
                        </ListItem>
                        <ListItem button component={Link} to="/suosikit">
                            <ListItemIcon>
                                <AccessibilityNewIcon />
                            </ListItemIcon>
                            <ListItemText primary="Suosikit" />
                        </ListItem>
                    </List>
                </Drawer>
                <Typography variant="h6" style={{margin : "auto", color: "white"}}>
                    Kirjahaku
                </Typography>
            </Toolbar>
        </AppBar>
        </CssBaseline>
    )
}

export default Header;