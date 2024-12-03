import React, { useState } from "react";
import { Fab, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function AddButton({ addContainer, add }) {
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the menu when the button is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={` ${!add && "opacity-100 cursor-pointer"} `}>
      {/* Floating Action Button */}
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {add && (
          <span>
            <MenuItem onClick={() => addContainer("text")}>
              {" "}
              Text Block{" "}
            </MenuItem>
            <MenuItem onClick={() => addContainer("todo")}>
              {" "}
              Todo List{" "}
            </MenuItem>
            <MenuItem onClick={() => addContainer("clock")}>
              {" "}
              Clock{" "}
            </MenuItem>
            <MenuItem onClick={() => addContainer("meme")}>
              {" "}
              Gimme Meme{" "}
            </MenuItem>
          </span>
        )}
      </Menu>
    </div>
  );
}
