export function isLogin() {
  let login = false;
  if (localStorage.getItem('token')) login = true;
  return login;
}
