import { <%= classify(name) %> } from './<%= dasherize(name) %>';

export module <%= classify(name) %>Action {

  export const LOAD_<%= name.toUpperCase() %> = 'Load_<%= classify(name) %>';
  export const SELECT_<%= name.toUpperCase() %> = 'Select_<%= classify(name) %>';
  export const ADD_<%= name.toUpperCase() %> = 'Add_<%= classify(name) %>';
  export const DELETE_<%= name.toUpperCase() %> = 'Delete_<%= classify(name) %>';
  export const UPDATE_<%= name.toUpperCase() %> = 'Update_<%= classify(name) %>';

  export class Load {
    static readonly type = LOAD_<%= name.toUpperCase() %>;
  }

  export class Select {
    static readonly type = SELECT_<%= name.toUpperCase() %>;

    constructor(public id: number) {}
  }

  export class Add {
    static readonly type = ADD_<%= name.toUpperCase() %>;

    constructor(public payload: <%= classify(name) %>) {}
  }

  export class Delete {
    static readonly type = DELETE_<%= name.toUpperCase() %>;

    constructor(public payload: <%= classify(name) %>) {}
  }

  export class Update {
    static readonly type = UPDATE_<%= name.toUpperCase() %>;

    constructor(public payload: <%= classify(name) %>) {}
  }
}
