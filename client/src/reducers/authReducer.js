const initialState = {
  currentUser: {name: localStorage.getItem("name")}
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return {...state, currentUser: action.payload};
    case "LOGOUT_USER":
      return { currentUser: {}}
    default:
      return state;
  }
}

export default authReducer;
