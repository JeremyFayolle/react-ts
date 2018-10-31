import * as React from "react";
import User, { UserFilters } from "../common/User";

export module UserFiltersForm {
  export interface Props {
    onFiltersChange: (e: UserFilters) => void
  }

  export interface State {
    filters: UserFilters
  }
}

export class UserFiltersForm extends React.Component<UserFiltersForm.Props, UserFiltersForm.State> {

  constructor(props: UserFiltersForm.Props) {
    super(props);

    this.state = {filters: {}}
  }

  handleInputChange(key: string, event: React.ChangeEvent<HTMLInputElement>) {
    this.setState(
      {filters: {...this.state.filters, [key]: event.target.value}},
      () => this.props.onFiltersChange(this.state.filters)
    );
  }

  render() {
    return (
        <form>
          <p>Filtre : </p>
          <label>
            Nom :
            <input type="text" onChange={e => this.handleInputChange('lastName', e)} />
          </label>
        </form>
    )
  }
}

export default UserFiltersForm;
