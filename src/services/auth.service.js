
class AuthService {
   register(userInfo) {
      let formdata = localStorage.getItem('formdata');

      if (formdata == null) {
         formdata = []
         formdata.push(userInfo)
         localStorage.setItem('formdata', JSON.stringify(formdata));
         return formdata;
      } else {
         let formArr = JSON.parse(formdata)
         formArr.push(userInfo)
         localStorage.setItem("formdata", JSON.stringify(formArr))
         console.log(formArr)
         return formArr;
      }

   }


   login(username, password) {

      // localStorage.setItem("user", JSON.stringify(response.data));

   }


   logout() {
      localStorage.removeItem("user");
   }


   getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
   }
}
export default new AuthService();
