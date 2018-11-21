import * as React from 'react';
import { connect } from 'react-redux';

import { UserFilters } from '../common/User';
import { StoreState, StoreDispatch, StoreActionType } from './store';

export module UserFiltersForm {
  export interface Props {
    filters: UserFilters;
    addUserFilters: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

export function UserFiltersForm(props: UserFiltersForm.Props): JSX.Element {
  const lastName = props.filters && props.filters.lastName || null;

  return (
    <form className="field">
      <p className="title is-4">Filtre :</p>
      <label>
        Nom
      </label>
      <div className="control">
        <input type="text" placeholder="Nom" value={lastName} onChange={e => props.addUserFilters('lastName', e)} />
      </div>
    </form>
  )
}


export default UserFiltersForm;
