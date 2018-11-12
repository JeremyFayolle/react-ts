import * as React from 'react';
import { UserFilters } from '../common/User';
import { StoreState, StoreDispatch, StoreActionType, StoreSyncAction } from './store';
import { connect } from 'react-redux';

export module UserFiltersForm {
  export interface Props {
    filters: UserFilters;
    addUserFilters: (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

const test = {
  display: 'relative'
}

export function UserFiltersForm(props: UserFiltersForm.Props) {
  return (
    <form className="field">
      <p className="title is-4">Filtre : </p>
      <label className="label">
        Nom :
      </label>
      <div className="control" style={test}>
        <input className="input" type="text" placeholder="Nom" value={props.filters && props.filters.lastName || undefined} onChange={e => props.addUserFilters('lastName', e)} />
      </div>
    </form>
  )
}

const mapStateToProps = (state: StoreState) => ({filters: state.userFilters});
​
const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  addUserFilters: (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {[key]: e.target.value};
    dispatch({type: StoreActionType.ADD_USER_FILTERS, data})
  }
});

export const EnhancedUserFiltersForm = connect<{ filters: UserFilters }, { addUserFilters(key: string, e: React.ChangeEvent<HTMLInputElement>): void }, {}, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(UserFiltersForm);

export default EnhancedUserFiltersForm;
