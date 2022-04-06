export const authAction = {
  loginStart: () => ({
    type: "LOGIN_START",
  }),

  loginSuccess: (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  }),

  loginFailure: (err) => ({
    type: "LOGIN_FAILURE",
    payload: err,
  }),

  follow: (userId) => ({
    type: "FOLLOW_USER",
    payload: userId,
  }),

  unFollow: (userId) => ({
    type: "UNFOLLOW_USER",
    payload: userId,
  }),
};
