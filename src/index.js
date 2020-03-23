import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./Assets/fonts/pacific.ttf";

//Redux imports starts here......
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import RegisterReducer from "./Store/Reducer/Register";
import AuthReducer from "./Store/Reducer/Auth";
import ProductsReducer from "./Store/Reducer/products";
// import AppReducer from "./Store/Reducer/App";
// import CatReducer from "./Store/Reducer/cat";
//Redux imports ends here........

//Redux management starts here.....
const rootReducer = combineReducers({
  register: RegisterReducer,
  auth: AuthReducer,
  products: ProductsReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
//Redux management ends here......

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
