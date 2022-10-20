import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger';
import absencesReducer from '../reducers/absencesReducer'

const logger = createLogger({
    collapsed:true
});

export default function configureStore() {
    let middlewares = [];
    if (process.env.NODE_ENV === 'development') {
        middlewares = [...middlewares, thunk, logger];
    } else {
        middlewares = [...middlewares, thunk];
    }

    const mainReducer = combineReducers({
        absences:absencesReducer
    })

    const rootReducer = (state, action) => {

        if (action.type === 'AUTH_LOGOUT_SUCCESS') {
            Object.keys(state).forEach(sk => {
                if (state[sk].savable) {
                    return;
                }

                state[sk] = undefined;
            })
        }

        return mainReducer(state, action)
    }

    const store = createStore(
        rootReducer,
        compose(applyMiddleware(...middlewares))
    );

    return store;
}