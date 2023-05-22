import { Box, Card, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { inter_medium } from "../../fonts/inter";

export const ListItem = ({ data, text, index, moveListItem, children }: any) => {
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item: any, monitor: any) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref: any = useRef(null);
  const dragDropRef: any = dragRef(dropRef(ref));
  
  // Make items being dragged transparent, so it's easier to see where we drop them
  return (
    <Box>
      {React.cloneElement(children, {
        text,
        dragDropRef,
        isDragging,
        data
      })}
    </Box>
  );
};
