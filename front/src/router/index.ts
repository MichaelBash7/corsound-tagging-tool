import React from "react";
import Login from "../pages/Login";
import Video from "../pages/Video";
import Users from "../pages/Users";
import UserDetail from "../pages/UserDetail";
export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    VIDEO = '/video',
    USERS_LIST = '/admin/users',
    USER_DETAIL = '/admin/user/:id'
}
export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: Login}
]
export const privateRoutes: IRoute[] = [
    {path: RouteNames.VIDEO, element: Video},
    {path: RouteNames.USERS_LIST, element: Users},
    {path: RouteNames.USER_DETAIL, element: UserDetail}
]