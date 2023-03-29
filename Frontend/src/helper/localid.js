function localid() {
  const user = localStorage.getItem("user");
  const local = JSON.parse(user);
  const localid = local._id;

  return localid;
}
export default localid;
