import axios from 'axios';
import jwt from 'jsonwebtoken'
import Axios from 'axios';
class GlobalLibrary {
   checkIfNull(...args) {
      for (let index = 0; index < args.length; index++) {
         if (!args[index])
            return true

      }
      return false
   }
   embeddedPermission(USER_ID, ACTION_ID) {
      try 
        
      } catch () {
         
      }
      axios.defaults.headers.common['USER_ID'] = USER_ID
      axios.defaults.headers.common['ACTION_ID'] = ACTION_ID
   }
   setAuthToken(token) {
      if (token) {
         axios.defaults.headers.common['auth-token'] = token;
      } else {
         delete axios.defaults.headers.common['auth-token'];
      }
   };
   destructToken() {
      try {

         return jwt.verify(localStorage.getItem('token'), 'i am handsome')
      } catch  {
         return null
      }
   }
}
export default GlobalLibrary