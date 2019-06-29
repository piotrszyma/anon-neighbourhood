import consts from '../consts';

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

function getYourNickname() {
  return get(consts.YourNicknameStorageKey);
}

function getAnonNickname() {
  return get(consts.AnonNicknameStorageKey);
}

export default {
  set, get, getYourNickname, getAnonNickname,
}