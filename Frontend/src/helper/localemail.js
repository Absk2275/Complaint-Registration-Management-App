

function loaclemail(){
const user =localStorage.getItem("user");
const local = JSON.parse(user);
const loaclemail =local.email;



return loaclemail;
}
export default loaclemail;