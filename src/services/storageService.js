function get(name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (error) {
    return localStorage.getItem(name);
  }
}

function set(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export default {
  set, get, getYourNickname, getAnonNickname,
}