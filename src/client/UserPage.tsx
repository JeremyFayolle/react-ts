import * as React from 'react';
import User, { UserFilters } from '../common/User';
import { StoreState, StoreDispatch, RefreshUsersStoreAction, StoreAsyncAction, StoreActionType } from './store';
import { connect } from 'react-redux';
import { getUsers, removeUser } from './api';
import { Link, Redirect } from 'react-router-dom';
import UserList from './UserList';
import { UserFiltersForm } from './UserFiltersForm';
import { flexBox, item } from './App';

export module UserPage {
  export interface Props {
    users: User[];
    filters: UserFilters;
    refreshUsers: () => void;
    addFilters: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    removeUser: (user: User) => void;
  }

  export interface State {
    redirectId: string;
  }
}

export class UserPage extends React.Component<UserPage.Props, UserPage.State> {
  constructor(props: UserPage.Props) {
    super(props);

    this.state = {redirectId: ''};
  }

  render() {
    const { redirectId } = this.state;

    if (redirectId) {
      return <Redirect to={"/" + redirectId}/>;
    }
    return (
      <div>
        <UserFiltersForm
          filters={this.props.filters}
          addUserFilters={(key: string, e: React.ChangeEvent<HTMLInputElement>) => this.props.addFilters(key, e)}/>
        <div style={flexBox}>
          <button style={item} className="button is-link" onClick={() => this.props.refreshUsers()}>Charger</button>
          <Link style={item} className="button is-success" to='/create'>Créer</Link>
        </div>
        <UserList users={this.props.users} onUpdateChange={user => this.setState({redirectId: user._id || null!})} onDeleteChange={user => this.props.removeUser(user)}/>
      </div>
    )
  }
}

function getUsersWithFilters(): StoreAsyncAction<RefreshUsersStoreAction> {
  return function (dispatch: StoreDispatch<RefreshUsersStoreAction>, getState: () => StoreState) {
    return getUsers(getState().userFilters).then(data => dispatch({type: StoreActionType.REFRESH_USERS, data}));
  }
}

const mapStateToProps = (state: StoreState) => ({users: state.users, filters: state.userFilters})
​
const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  refreshUsers: () => { dispatch(getUsersWithFilters()) },
  addFilters: (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {[key]: (e.target as React.InputHTMLAttributes<any>).value};
    dispatch({type: StoreActionType.ADD_USER_FILTERS, data})
  },
  removeUser: (user: User) => {
     return removeUser(user).then(data => dispatch({type: StoreActionType.REFRESH_USERS, data}))
  }
})
​
export const EnhancedUserPage = connect<{ users: User[], filters: UserFilters }, { refreshUsers(): void}, {}, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);

export default EnhancedUserPage;
