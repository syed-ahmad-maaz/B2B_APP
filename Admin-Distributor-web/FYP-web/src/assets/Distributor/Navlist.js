import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Footer from "./Footer/Footer";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton to="/viewretailerlistfordistributor">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>

      <ListItemText primary="All Retailers" />
    </ListItemButton>
    <ListItemButton to="/viewretailerlist">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>

      <ListItemText primary="Assigned Retailers" />
    </ListItemButton>

    <ListItemButton to="/retailer/order">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>

      <ListItemText primary="Assigned Orders" />
    </ListItemButton>

    <ListItemButton to="/dispatcher">
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>

      <ListItemText primary="Dispatchers" />
    </ListItemButton>

    <ListItemButton to="/listofdispatch">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>

      <ListItemText primary="Assigned Dispatch" />
    </ListItemButton>
  </React.Fragment>
);
