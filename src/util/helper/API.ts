const API_URL = process.env.API_URL;
const SignIn = `${API_URL}/dev-panel/auth/sign-in`;
const Auth = `${API_URL}/dev-panel/auth/`;
const header = new Headers();
header.append("Content-Type", "application/json");
export default {
  API_URL,
  SignIn,
  Auth,
  RequestHeader: header,
};
