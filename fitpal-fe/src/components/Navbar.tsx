import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { EMAIL_LS, TOKEN_LS } from "../config";

interface IPage {
  name: string;
  uri: string;
}

interface NavBarProps {
  image: string | null; 
}

const pages: IPage[] = [
  { name: "Home", uri: "Home" },
  { name: "Messages", uri: "Messages" },
];

const settings: IPage[] = [
  { name: "Profile", uri: "Profile" },
  { name: "Logout", uri: "Login" },
];
const NavBar: React.FC<NavBarProps> = ({ image }) => {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMoveToPage = (uri: string) => {
    if (uri == "Login") {
      localStorage.removeItem(TOKEN_LS);
      localStorage.removeItem(EMAIL_LS);
    }
    navigate(`/${uri}`);
  };

  const handleClickOnSetting = (page: string) => {
    handleCloseUserMenu();
    handleMoveToPage(page);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h4">FitPal</Typography>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            {localStorage.getItem(TOKEN_LS) &&
              pages.map((page: IPage) => (
                <Button
                  key={page.name}
                  onClick={() => handleMoveToPage(page.uri)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {localStorage.getItem(TOKEN_LS) && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={image || "/static/images/avatar/2.jpg"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting: IPage) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => handleClickOnSetting(setting.uri)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
