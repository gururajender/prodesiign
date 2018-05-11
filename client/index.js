import React from 'react';
import ReactDOM from 'react-dom'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import Root from './routes';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from './Reducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/LoginAction';


const store = createStore(
  Reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Root history={browserHistory}/>
    </AppContainer>
  </Provider>,
  document.getElementById('app')
);
if (module.hot) {
    module.hot.accept('./routes', () => {
        const NextApp = require('./routes').default;
        render(
          <Provider>
            <AppContainer>
                <NextApp history={browserHistory} />
            </AppContainer>
          </Provider>,
            document.getElementById('app')
        );
    });
}
