function localname() {
    const user = localStorage.getItem("user");
    const local = JSON.parse(user);
    const localname = local.username;
  
    return localname;
  }
  export default localname;