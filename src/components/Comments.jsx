import { Avatar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const Comments = ({ x, y }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation(e);

        setIsActive((prev) => !prev);
    };
    return (
        <Stack
            onClick={handleClick}
            direction="row"
            gap="8px"
            sx={{
                overflow: "hidden",
                // display: isZoom ? "none" : "flex",
                width: "45px",
                // height: "45px",
                maxHeight: "214px",
                position: "absolute",
                top: `${y}px`,
                left: `${x}px`,
                zIndex: 9999,
                bgcolor: "#27374D",
                borderRadius: "4px 24px 24px 24px",
                pt: "5px",
                pl: "7px",
                cursor: "pointer",
                opacity: isActive ? "1" : "0.5",
                transition: "opacity 0.2s linear",
                animation: isActive
                    ? "grow 0.3s forwards linear"
                    : "shrink 0.3s forwards linear",
                "&:hover": {
                    opacity: "1",
                },
            }}
        >
            <Avatar
                src="/vite.svg"
                sx={{ alignSelf: "flex-start", width: "30px", height: "30px" }}
            />
            <Typography>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo con
            </Typography>
        </Stack>
    );
};

export default Comments;
