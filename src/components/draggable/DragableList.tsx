import React, { useState, useCallback, useEffect } from "react";
import { ListItem } from "./ListItem";
import { Box } from "@mui/material";

export const DragableList = ({ elements = [], children, onChange }: any) => {
  const [options, setOptions] = useState(elements);
  useEffect(() => {
    setOptions(elements);
  }, [elements]);

  const moveOptionListItem = useCallback(
    (dragIndex: any, hoverIndex: any) => {
      const dragItem = options[dragIndex];
      const hoverItem = options[hoverIndex];
      // Swap places of dragItem and hoverItem in the options array
      setOptions((options: any) => {
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
        {options.map((option: any, index: any) => (
          <ListItem
            key={option.id}
            index={index}
            text={option.name}
            data={option.data}
            moveListItem={moveOptionListItem}
          >
            {children}
          </ListItem>
        ))}
      </Box>
    </div>
  );
};
