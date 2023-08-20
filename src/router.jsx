import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import ReactZoomPinch from "./pages/ReactZoomPinch";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<ReactZoomPinch />} />
        </Route>
    )
);

export default router;
