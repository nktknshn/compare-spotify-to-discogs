import { createStore, combineReducers, Dispatch, applyMiddleware } from "redux";
import { useSelector as useSelectorUntyped, useDispatch as useDispatchRaw, TypedUseSelectorHook } from 'react-redux';
import { appReducer, AppActions } from "./app/reducer";
import { createLogger } from 'redux-logger'
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
    app: appReducer
})

const store = createStore(rootReducer,
    applyMiddleware(
        thunk as ThunkMiddleware<AppState, AllActions>,
        createLogger({ collapsed: true })
    )
)

export type AppState = ReturnType<typeof rootReducer>;
export type AllActions = AppActions

export type ThunkAC<R = void> = ThunkAction<R, AppState, undefined, AllActions>

export const useSelector: TypedUseSelectorHook<AppState> = useSelectorUntyped;
export const useDispatch = () => useDispatchRaw<typeof store.dispatch>();
// export const useDispatch = () => useDispatchRaw<Dispatch<AllActions>>();

export default store