const groupReducer = (action) => {
  switch(action.type) {
    case 'CREATED_GROUP':
      return {...state, group: action.payload};
    default:
      return state;
  }
}

export default groupReducer;
