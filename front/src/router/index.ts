import React from "react";
import Login from "../pages/Login";
import Video from "../pages/Video";
import ControlPanel from "../pages/ControlPanel";
export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    VIDEO = '/video',
    CONTROL = '/control'
}
export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: Login}
]
export const privateRoutes: IRoute[] = [
    {path: RouteNames.VIDEO, element: Video},
    {path: RouteNames.CONTROL, element: ControlPanel}
]