import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {

    const {store} = useContext(Context)

    return (
        store.isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.element/>}/>
                )}
                <Route path={RouteNames.LOGIN} element={<Navigate to={RouteNames.VIDEO} replace/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.element/>}/>
                )}
                <Route path="/*" element={<Navigate to={RouteNames.LOGIN} replace/>}/>
            </Routes>
    )
}

export default observer(AppRouter)