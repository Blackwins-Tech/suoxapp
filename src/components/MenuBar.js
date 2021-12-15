import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";

import SugarLevel from "../components/SugarLevel";
import OxygenLevel from "../components/OxygenLevel";
import ViewData from "../components/ViewData";
import ViewOxygenData from "../components/ViewOxygenData";

//const pages = ["SugarData", "OxygenData", "Sugar", "Oxygen"];
const settings = ["Profile", "Logout"];

const MenuBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const menuClicked = (event) => {
  //   if (event.target.textContent === "Dashboard") {
  //     console.log(event.target.textContent);
  //   } else if (event.target.textContent === "Sugar") {
  //     console.log(event.target.textContent);
  //   } else if (event.target.textContent === "Oxygen") {
  //     console.log(event.target.textContent);
  //   }
  // };

  return (
    <Router>
      <AppBar color="primary" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              SuOx App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                <MenuItem>
                  <Link className="menuItem" to="/ViewData">
                    Sugar Data
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className="menuItem" to="/ViewOxygenData">
                    Oxygen Data
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className="menuItem" to="/SugarLevel">
                    Sugar
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className="menuItem" to="/OxygenLevel">
                    Oxygen
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              SuOx App
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* { {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button> }
                
              ))} */}
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/ViewData">Sugar Data</Link>
              </Button>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/ViewOxygenData">Oxygen Data</Link>
              </Button>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/SugarLevel">Sugar</Link>
              </Button>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/OxygenLevel">Oxygen</Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<ViewData />}></Route>
        <Route exact path="/ViewData" element={<ViewData />}></Route>
        <Route
          exact
          path="/ViewOxygenData"
          element={<ViewOxygenData />}
        ></Route>
        <Route exact path="/SugarLevel" element={<SugarLevel />}></Route>
        <Route exact path="/OxygenLevel" element={<OxygenLevel />}></Route>
      </Routes>
    </Router>
  );
};
export default MenuBar;
