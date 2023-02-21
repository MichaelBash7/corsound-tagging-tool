import React from "react";
import Login from "../pages/Login";
import Video from "../pages/Video";
export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    VIDEO = '/video'
}
export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: Login}
]
export const privateRoutes: IRoute[] = [
    {path: RouteNames.VIDEO, element: Video}
]