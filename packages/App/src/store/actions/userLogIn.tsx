export const userLogIn = (email: string, password: string) => {
  return {
    type: 'USER_LOG_IN',
    payload: {email, password},
  };
};
