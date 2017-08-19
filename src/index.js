import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import {Router, Route, browserHistory} from 'react-router';
import {matchPattern} from 'react-router/lib/PatternUtils';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {timeline} from './reducers/timeline';
import {notificacao} from './reducers/header';
import {Provider} from 'react-redux';

function verificaAutenticacao(nextState, replace){
  const resultado = matchPattern('/timeline(/:login)', nextState.location.pathname);
  const enderecoPrivadoTImeline = resultado.paramValues[0]===undefined;

  if(enderecoPrivadoTImeline && localStorage.getItem('auth-token')===null){
    replace('/?msg=Você precisa estar logado para acessar essa página!');
  }
}


const reducers = combineReducers({timeline, notificacao})
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/timeline" component={App} onEnter={verificaAutenticacao} />
      <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao} />
      <Route path="/logout" component={Logout}  />
    </Router>
  </Provider>,
  document.getElementById('root')

  //<!--Route path="/timeline/:login" component={App}  /-->
);
