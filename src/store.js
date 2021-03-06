import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
	return compose(
		applyMiddleware(thunk)
	)(createStore)(rootReducer, initialState);
}
