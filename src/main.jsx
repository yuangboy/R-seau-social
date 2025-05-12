import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk";              
import {logger} from "redux-logger";              
import { composeWithDevTools } from "redux-devtools-extension";              
import rootReducer from "./reducer";
import { getUsers } from './actions/users.action.jsx';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getUsers());



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
