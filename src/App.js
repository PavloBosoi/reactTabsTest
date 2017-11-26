import React, { Component } from 'react';
import './App.css';
import { NavLink, Route, BrowserRouter as Router } from 'react-router-dom';

import dummyTable from './tabs/dummyTable';
import dummyChart from './tabs/dummyChart';
import dummyList from './tabs/dummyList';

const componentRegistry = {
    "dummyList": dummyList,
    "dummyTable": dummyTable,
    "dummyChart": dummyChart
};

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tabs: []
        }
    }
    componentDidMount () {
        this.getDataTabs();
    }
    getDataTabs () {
        fetch('tabs.json',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(parsedJSON => parsedJSON.tabs.map(tab => (
                {
                    id: `${tab.id}`,
                    title: `${tab.title}`,
                    order: `${tab.order}`,
                    path: `${tab.path}`
                }
            )))
            .then(tabs => this.setState({
                tabs
            }))
            .catch(error => console.log('parsing failed', error))
    }
  render() {
        const {tabs} = this.state;
    return (
      <div className="App">

          <Router>
              <div className="container">
                  <ul className="tabs">
                      {tabs.map(tab => {
                          if(+tab.order !== 0) {
                              return <li className="tab" key={tab.order}>
                                  <NavLink to={'/' + tab.id} activeClassName="active">{tab.title}</NavLink>
                              </li>
                          }
                          return <li className="tab" key={tab.order}>
                              <NavLink exact to={'/'} activeClassName="active">{tab.title}</NavLink>
                          </li>
                      })}
                  </ul>
                  <div className="tabs-content">
                      {tabs.map(tab => {
                          if(+tab.order !== 0){
                              return <Route key={tab.order} path={'/'+tab.id} component={componentRegistry[tab.id]}/>
                          }
                          return <Route exact key={tab.order} path={'/'} component={componentRegistry[tab.id]}/>
                      })}
                  </div>
              </div>
          </Router>

      </div>
    );
  }
}

export default App;
