import axios from "axios";
export default axios.create({
  baseURL: "https://react-passport.herokuapp.com",
  withCredentials: true,
});
