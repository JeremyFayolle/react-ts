import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import User from '../common/User';
import { useCreateUser } from './hooks';

export function UserForm(props: RouteComponentProps): JSX.Element {
  // const { redirect } = this.state;
  // if (redirect) return (<Redirect to='/'/>);

  const {candidate, setCandidateProp, save, redirection} = useCreateUser();

  if (redirection) return (<Redirect to='/'/>);
  return (
    <form className="field" onSubmit={e => {
      e.preventDefault();
      save(candidate);
    }}>
      <p className="title is-4">Création</p>
      <div className="item">
        <label>
          Prénom
        </label>
        <input type="text" value={candidate.firstName} onChange={e => setCandidateProp('firstName', e.target.value)} />
      </div>
      <div className="item">
        <label>
          Nom
        </label>
        <input type="text" value={candidate.lastName} onChange={e => setCandidateProp('lastName', e.target.value)} />
      </div>
      <div className="item">
        <label>
          Email
        </label>
        <input type="text" value={candidate.email} onChange={e => setCandidateProp('email', e.target.value)} />
      </div>
      <div className="item">
        <select className="select" defaultValue={User.Gender.Female} value={candidate.gender} onChange={e => setCandidateProp('gender', e.target.value as User.Gender)}>
          <option value={User.Gender.Female}>Female</option>
          <option value={User.Gender.Male}>Male</option>
        </select>
      </div>
      <div className="item">
        <label>
          Adresse ip
        </label>
        <input type="text" value={candidate.ipAddress} onChange={e => setCandidateProp('ipAddress', e.target.value)} />
      </div>
      <div className="flexBox">
        <button className="item button is-warning" onClick={() => console.log('click')}>Annuler</button>
        <input className="item button is-link" type="submit" value='Enregistrer' />
      </div>
    </form>
  );
}

export const defaultCandidate: User =  {_id: null, firstName: '', lastName: '', email: '', gender: User.Gender.Male, ipAddress: ''};

export default UserForm;
