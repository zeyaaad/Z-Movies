import  ReactDOM  from "react-dom/client";
import  APP  from "./App";
import {HashRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import "./index.css"
let root=ReactDOM.createRoot(document.getElementById("root"))

root.render(
        <HashRouter>
            <APP/>
        </HashRouter>



)