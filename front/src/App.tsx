import React, {FC, useContext, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {Layout} from "antd";
import Navbar from "./components/Navbar";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import './App.css'

const App: FC = () => {


    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])


  return (
      <Layout>
          <Navbar/>
          <Layout.Content>
              <AppRouter/>
          </Layout.Content>
      </Layout>
  );
};

export default observer (App);
