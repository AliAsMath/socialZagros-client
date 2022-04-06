const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: "",
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: "",
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "FOLLOW_USER":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (userId) => userId !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default authReducer;
