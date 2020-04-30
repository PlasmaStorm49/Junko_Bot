function changeName(oldM, newM) {
  if (newM.id !== "320360650603888640") {
    return;
  }
  if (newM.nickname == "Monkey Jr") {
    return;
  }
  newM.setNickname("Monkey Jr");
}

module.exports = { changeName };
