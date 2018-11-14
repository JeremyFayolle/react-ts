import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';

import User from '../common/User';
import { Api } from './api';
import { StoreDispatch, StoreActionType, StoreState } from './store';

export module UserForm {
  export interface Props extends RouteComponentProps {
    user: User;
    createUser: (candidate: User) => void;
    updateUser: (user: User) => void;
  }

  export interface State {
    candidate: User;
    redirect: boolean;
  }
}

export class UserForm extends React.Component<UserForm.Props, UserForm.State> {

  constructor(props: UserForm.Props) {
    super(props);

    this.state = {
      candidate: props.user || {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''},
      redirect: false
    }
  }

  handleInputChange(key: string, event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value;
    this.setState(
      state =>( {...state, candidate: {...state.candidate, [key]: value}})
    );
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.props.user ? this.props.updateUser(this.state.candidate) : this.props.createUser(this.state.candidate);
    this.setState({
      candidate: {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''},
      redirect: true
    });
  }

  render(): JSX.Element {
    const { redirect } = this.state;
    if (redirect) return (<Redirect to='/'/>);
    return (
      <form className="field" onSubmit={e => this.handleSubmit(e)}>
        <p className="title is-4">{this.props.user ? 'Mettre à jour' : 'Création'}</p>
        <div className="item">
          <label>
            Prénom
          </label>
          <input type="text" value={this.state.candidate.firstName} onChange={e => this.handleInputChange('firstName', e)} />
        </div>
        <div className="item">
          <label>
            Nom
          </label>
          <input type="text" value={this.state.candidate.lastName} onChange={e => this.handleInputChange('lastName', e)} />
        </div>
        <div className="item">
          <label>
            Email
          </label>
          <input type="text" value={this.state.candidate.email} onChange={e => this.handleInputChange('email', e)} />
        </div>
        <div className="item">
          <select className="select" defaultValue={User.Gender.Female} value={this.state.candidate.gender} onChange={e => this.handleInputChange('gender', e)}>
            <option value={User.Gender.Female}>Female</option>
            <option value={User.Gender.Male}>Male</option>
          </select>
        </div>
        <div className="item">
          <label>
            Adresse ip
          </label>
          <input type="text" value={this.state.candidate.ipAddress} onChange={e => this.handleInputChange('ipAddress', e)} />
        </div>
        <div className="flexBox">
          <button className="item button is-warning" onClick={() => this.setState({redirect: true})}>Annuler</button>
          <input className="item button is-link" type="submit" value={this.props.user ? 'Modifier' : 'Enregistrer'} />
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({users}: StoreState) => ({users});

const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  createUser: (candidate: User) => {
    Api.createUser(candidate).then(data => dispatch({type: StoreActionType.REFRESH_USERS, data}))
  },
  updateUser: (user: User) => {
    Api.editUser(user).then(data => dispatch({type: StoreActionType.REFRESH_USERS, data}))
  }
})

type DispatchProps = { createUser(candidate: User): void, updateUser(user: User): void };

const mergeProps = (stateProps: { users: User[] }, dispatchProps: DispatchProps, ownProps: RouteComponentProps<{ id: string }>) => {
  const userId = ownProps.match.params.id;
  const user = userId === 'new' ? null! : stateProps.users.find(user => user._id === userId) || null!;
  return {...ownProps, ...stateProps, ...dispatchProps, user};
};
​
export const EnhancedUserForm = connect<{ users: User[] }, DispatchProps, RouteComponentProps<{ id: string }>, UserForm.Props, StoreState>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserForm);

export default EnhancedUserForm;
