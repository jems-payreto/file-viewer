import React, { useRef, useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Document, Page } from "react-pdf";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { pdfjs } from "react-pdf";
import Comments from "../components/Comments";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const ReactZoomPinch = () => {
    const [comments, setComments] = useState([{ id: 1, x: 200, y: 200 }]);
    const ref = useRef(null);
    const [isZoom, setIsZoom] = useState(false);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleClick(e) {
        const rect = ref.current.getBoundingClientRect();

        console.log("rect", rect);

        const x = e.clientX - rect.left - 50;
        const y = e.clientY - rect.top - 70;

        console.log("y", y, "x", x);

        if (y < 1) return;

        setComments((prev) => [...prev, { id: Math.random() * x + y, x, y }]);
    }

    return (
        <Stack
            sx={{
                height: "90vh",
                width: "700px",
                border: "1px solid #9DB2BF99",
                overflow: "hidden",
            }}
        >
            {" "}
            <div ref={ref} onClick={handleClick}>
                <TransformWrapper
                    initialScale={1}
                    wheel={{ wheelDisabled: true }}
                    doubleClick={{ disabled: true }}
                    onZoom={({ state }) => {
                        if (state.scale !== 1) {
                            return setIsZoom(true);
                        }

                        return setIsZoom(false);
                    }}
                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <React.Fragment>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ bgcolor: "#9DB2BF99", p: "16px" }}
                            >
                                <Typography
                                    fontWeight={300}
                                    fontSize="12px"
                                    lineHeight="20px"
                                >
                                    OR_07-23-2023.png
                                </Typography>
                                <Stack direction="row" gap="8px">
                                    <IconButton onClick={() => zoomIn()}>
                                        <ZoomInIcon />
                                    </IconButton>
                                    <IconButton onClick={() => zoomOut()}>
                                        <ZoomOutIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => resetTransform()}
                                    >
                                        <FindReplaceIcon />
                                    </IconButton>
                                    <IconButton>
                                        <DownloadIcon />
                                    </IconButton>
                                </Stack>

                                <IconButton onClick={() => resetTransform()}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <TransformComponent
                                // wrapperProps={{
                                //     onClick: handleClick,
                                // }}
                                wrapperStyle={{
                                    width: "100%",
                                    position: "relative",
                                }}
                            >
                                <Stack
                                    component={Document}
                                    file="file.pdf"
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    sx={{ position: "relative" }}
                                >
                                    {comments.length >= 1 &&
                                        comments.map((comment) => (
                                            <Comments
                                                key={comment.id}
                                                isZoom={isZoom}
                                                x={comment.x}
                                                y={comment.y}
                                            />
                                        ))}
                                    <Page pageNumber={pageNumber} />
                                </Stack>
                            </TransformComponent>

                            {pageNumber}
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>
        </Stack>
    );
};

export default ReactZoomPinch;
