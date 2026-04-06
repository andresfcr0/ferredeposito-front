import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 320;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    text: "Facturación",
    icon: <PointOfSaleIcon />,
    path: "/ventas",
  },
  {
    text: "Compras",
    icon: <ShoppingCartIcon />,
    path: "/compras",
  },
  {
    text: "Productos",
    icon: <InventoryIcon />,
    path: "/productos",
  },
  {
    text: "Proveedores",
    icon: <PeopleIcon />,
    path: "/proveedores",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerOpen ? drawerWidth : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerOpen ? drawerWidth : 60,
          boxSizing: "border-box",
          transition: "width 0.4s",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: drawerOpen ? "flex-start" : "center",
          alignItems: "center",
          px: drawerOpen ? 1 : 0,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List sx={{ marginLeft: drawerOpen ? 4 : 0, px: 0 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              justifyContent: drawerOpen ? "flex-start" : "center",
              px: drawerOpen ? 2 : 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 2 : 0,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {drawerOpen && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        <ListItemButton
          sx={{
            justifyContent: drawerOpen ? "flex-start" : "center",
            px: drawerOpen ? 2 : 1,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: drawerOpen ? 2 : 0,
              justifyContent: "center",
            }}
          >
            <SettingsIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Configuración" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
}
