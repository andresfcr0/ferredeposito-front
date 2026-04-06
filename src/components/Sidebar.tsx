import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

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
  return (
    <Drawer
      variant="permanent"
      open={false}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List sx={{ marginLeft: 4 }}>
        {menuItems.map((item) => (
          <ListItemButton key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        <ListItemButton>
          <ListItemText primary="Configuración" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
