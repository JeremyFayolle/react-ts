// TODO - idem
import * as React from 'react';
import User from '../common/User';
import { StoreDispatch, StoreActionType, StoreState } from './store';
import { Api } from './api';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { flexBox, item } from './App';

export module UserForm {
  // TODO - Remove comments
  // export type Mode = 'create' | 'update';

  export interface Props extends RouteComponentProps {
    user: User;
    createUser: (candidate: User) => void;
    updateUser: (user: User) => void;
  }

  export interface State {
    // TODO - idem
    // input: User,
    candidate: User;
    redirect: boolean;
    // TODO - idem
    // mode: UserForm.Mode
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

  // TODO - idem
  // static getDerivedStateFromProps(nextProps: UserForm.Props, {input}: UserForm.State) {
  //   if (nextProps.candidate === input) return;
  //   return !nextProps.candidate ?
  //     {input: nextProps.candidate, mode: 'create', candidate: {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''}} :
  //     {input: nextProps.candidate, mode: 'update', candidate: {...nextProps.candidate}};
  // }

  // TODO - Type return
  handleInputChange(key: string, event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    this.setState(
      state =>( {...state, candidate: {...state.candidate, [key]: value}})
    );
  }

  // TODO - idem
  // TODO - type the argument
  handleSubmit(e: any) {
    e.preventDefault();
    this.props.user ? this.props.updateUser(this.state.candidate) : this.props.createUser(this.state.candidate);
    this.setState({
      candidate: {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''},
      redirect: true
    });
  }

  // TODO - idem
  render() {
    const { redirect } = this.state;
    // TODO - Wrap your JSX statements in brackets
    if (redirect) return <Redirect to='/'/>;
    // TODO - idem
    // TODO - Extends bulma class in CSS instead of declare useless class
    // TODO - The column must be defined in CSS
    return (
      <form className="field" onSubmit={e => this.handleSubmit(e)}>
        <p className="title is-4">{this.props.user ? 'Mettre à jour' : 'Création'}</p>
        <div style={item}>
          <label className="label">
            Prénom :
          </label>
          <input className="input" type="text" value={this.state.candidate.firstName} onChange={e => this.handleInputChange('firstName', e)} />
        </div>
        <div style={item}>
          <label className="label">
            Nom :
          </label>
          <input className="input" type="text" value={this.state.candidate.lastName} onChange={e => this.handleInputChange('lastName', e)} />
        </div>
        <div style={item}>
          <label className="label">
            Email :
          </label>
          <input className="input" type="text" value={this.state.candidate.email} onChange={e => this.handleInputChange('email', e)} />
        </div>
        <div style={item}>
          <select className="select" defaultValue={User.Gender.Female} value={this.state.candidate.gender} onChange={e => this.handleInputChange('gender', e)}>
            <option value={User.Gender.Female}>Female</option>
            <option value={User.Gender.Male}>Male</option>
          </select>
        </div>
        <div style={item}>
          <label className="label">
            Adresse ip :
          </label>
          <input className="input" type="text" value={this.state.candidate.ipAddress} onChange={e => this.handleInputChange('ipAddress', e)} />
        </div>
        <div style={flexBox}>
          <button style={item} className="button is-warning" onClick={() => this.setState({redirect: true})}>Annuler</button>
          <input style={item} className="button is-link" type="submit" value={this.props.user ? 'Modifier' : 'Enregistrer'} />
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
