import User, { UserFilters } from '../common/User';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Reducer, Store, createStore, compose, applyMiddleware } from 'redux';

export enum StoreActionType { REFRESH_USERS, ADD_USER_FILTERS };

export interface StoreSyncAction<K extends StoreActionType = StoreActionType, T = {}> {
  type: K;
  data: T;
};

export interface StoreAsyncAction<A extends StoreSyncAction<K, T> = StoreSyncAction<K, T>, K extends StoreActionType = StoreActionType, T = {}> extends ThunkAction<any, StoreState, undefined, A> { }

export interface StoreDispatch<A extends StoreSyncAction<K, T> = StoreSyncAction<K, T>, K extends StoreActionType = StoreActionType, T = {}> extends ThunkDispatch<StoreState, undefined, A> { }

export type RefreshUsersStoreAction = StoreSyncAction<StoreActionType.REFRESH_USERS, User[]>

export type AddUserFiltersStoreAction = StoreSyncAction<StoreActionType.ADD_USER_FILTERS, UserFilters>

export interface StoreState { users: User[], userFilters: UserFilters }

export function buildStore(initialState: StoreState): Store<StoreState, StoreSyncAction> {
  const chromeDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  return createStore<StoreState, StoreSyncAction, any, any>(
    function storeReducer(state = initialState, action: StoreSyncAction): StoreState {
      switch(action.type) {
        case StoreActionType.REFRESH_USERS: return {...state, users: (action as RefreshUsersStoreAction).data};
        case StoreActionType.ADD_USER_FILTERS: return {...state, userFilters: (action as AddUserFiltersStoreAction).data};
        default: return state;
      }
    },
    chromeDevTools ? compose (applyMiddleware(thunk), chromeDevTools()) : applyMiddleware(thunk)
  )
}
