import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import DetailedView from './components/DetailedView';
import {Switch, Route} from 'react-router-dom';


export default function() {

    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route component={List} exact path ='/'/>
          <Route component={DetailedView} path="/task/:id" />
        </Switch>
      </div>
    );
}



