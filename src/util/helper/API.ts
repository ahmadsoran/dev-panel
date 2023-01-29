const API_URL = "http://127.0.0.1:1919/api/1.0";
const Next_API_URL = "http://localhost:3000/api";
const SignIn = `${API_URL}/dev-panel/auth/sign-in`;
const Auth = `${Next_API_URL}/auth`;
const Platforms = `${Next_API_URL}/platform`;

export const header = new Headers();
header.append("Content-Type", "application/json");

export default {
  API_URL,
  SignIn,
  Auth,
  Platforms,
  RequestHeader: header,
};
