import React, { useState, useCallback } from "react";
import { ListItem } from "./ListItem";
import { Box } from "@mui/material";

export const DragableList = ({ elements, children, onChange }) => {
  const [options, setOptions] = useState(elements);

  const moveOptionListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = options[dragIndex];
      const hoverItem = options[hoverIndex];
      // Swap places of dragItem and hoverItem in the options array
      setOptions((options) => {
        const updateOptions = [...options];
        updateOptions[dragIndex] = hoverItem;
        updateOptions[hoverIndex] = dragItem;
        onChange(updateOptions);
        return updateOptions;
      });
    },
    [options]
  );

  return (
    <div>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto", rowGap: 1 }}>
        {options.map((option, index) => (
          <ListItem
            key={option.id}
            index={index}
            text={option.name}
            moveListItem={moveOptionListItem}
          >
            {children}
          </ListItem>
        ))}
      </Box>
    </div>
  );
};
