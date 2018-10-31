import * as React from "react";
import User from "../common/User";

export module UserForm {
  export type Mode = 'create' | 'update';

  export interface Props {
    onSubmit: (mode: UserForm.Mode, candidate: User) => void
    candidate: User
  }

  export interface State {
    input: User,
    candidate: User,
    mode: UserForm.Mode
  }
}


export class UserForm extends React.Component<UserForm.Props, UserForm.State> {

  constructor(props: UserForm.Props) {
    super(props);

    this.state = {
      input: null!,
      candidate: {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''},
      mode: 'create'
    }
  }

  static getDerivedStateFromProps(nextProps: UserForm.Props, {input}: UserForm.State) {
    if (nextProps.candidate === input) return;
    return !nextProps.candidate ?
      {input: nextProps.candidate, mode: 'create', candidate: {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''}} :
      {input: nextProps.candidate, mode: 'update', candidate: {...nextProps.candidate}};
  }

  handleInputChange(key: string, event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState(
      state =>( {...state, candidate: {...state.candidate, [key]: value}})
    );
  }

  handleSubmit(e: any) {
    this.props.onSubmit(this.state.mode, this.state.candidate);
    this.setState({candidate: {id: 0, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''}})
    e.preventDefault();
  }

  render() {
    return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <p>{this.state.mode === 'create' ? 'Création' : 'Modification'}</p>
          <div>
            <label>
              id :
              <input type="text" value={this.state.candidate.id} onChange={e => this.handleInputChange('id', e)} />
            </label>
            <label>
              Prénom :
              <input type="text" value={this.state.candidate.firstName} onChange={e => this.handleInputChange('firstName', e)} />
            </label>
            <label>
              Nom :
              <input type="text" value={this.state.candidate.lastName} onChange={e => this.handleInputChange('lastName', e)} />
            </label>
          </div>
          <div>
            <label>
              Email :
              <input type="text" value={this.state.candidate.email} onChange={e => this.handleInputChange('email', e)} />
            </label>
            <label>
              Adresse ip :
              <input type="text" value={this.state.candidate.ipAddress} onChange={e => this.handleInputChange('ipAddress', e)} />
            </label>
          </div>
          <input type="submit" value="Enregistrer" />
        </form>
    )
  }
}

export default UserForm;
