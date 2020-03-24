export function createStore(reducer, initState, enhancer) {
    if (typeof initState === "function") {
        enhancer = initState;
        initState = undefined;
    }
    if (enhancer) {
        return enhancer(createStore)(reducer, initState);
    }
    let state = initState | {};
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
        return action;
    };

    const replaceReducer = nextReducer => {
        reducer = nextReducer;
        dispatch({ type: Symbol("void") });
    };

    const subscribe = listener => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({ type: Symbol("void") });
    return {
        getState,
        dispatch,
        subscribe,
        replaceReducer
    };
}

// const reducer = combineReducers({
//     counter: counterReducer,
//     info: InfoReducer
// });
export function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    return function(state = {}, action) {
        const newState = {};
        reducerKeys.forEach(key => {
            const keyState = reducers[key](state[key]);
            newState[key] = keyState;
        });
        return newState;
    };
}

// middleWare:({ getState, dispatch }) => next => action => {...}
export function applyMiddleware(...middlewares) {
    return createStore => (reducer, initState) => {
        const store = createStore(reducer, initState);
        const dispatch = store.dispatch;
        // avoid expose store
        const simpleStore = { getState: store.getState };
        const storedMiddlewares = middlewares.map(middleware =>
            middleware(simpleStore)
        );
        // is it necessary to reverse?
        const newDispatch = storedMiddlewares
            .reverse()
            .reduce(
                (args, storedMiddleware) => storedMiddleware(args),
                dispatch
            );
        store.dispatch = newDispatch;
        return store;
    };
}
