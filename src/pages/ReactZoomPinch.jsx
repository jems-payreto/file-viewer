import React, { useState } from "react";
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

const ReactZoomPinch = () => {
    const [isZoom, setIsZoom] = useState(false);

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.js",
        import.meta.url
    ).toString();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Stack
            sx={{
                height: "90vh",
                width: "700px",
                border: "1px solid #9DB2BF99",
            }}
        >
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
                                <IconButton onClick={() => resetTransform()}>
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
                                <Comments isZoom={isZoom} />
                                <Page pageNumber={pageNumber} />
                            </Stack>
                        </TransformComponent>

                        {pageNumber}
                    </React.Fragment>
                )}
            </TransformWrapper>
        </Stack>
    );
};

export default ReactZoomPinch;
