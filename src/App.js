import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import {createStore} from 'redux';
import {timeline} from './reducers/timeline';
const store = createStore(timeline);

// FUNÇÃO REDUTORA (REDUCER)



class App extends Component {
  render() {
    return (
    <div id="root">
      <div className="main">
        <Header/>
        <Timeline login={this.props.params.login} store={store} />
      </div>
    </div>
    );
  }
}

export default App;
