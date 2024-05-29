import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import metroHost from "./metroHost";
const GetRegion = async () => {
  try {
    let url = `http://192.168.43.188:5000/region`;
    // http://192.168.1.152:5000
    // let url = `${REACT_APP_HEROKU}/region`;
    var res = await fetch(url);
    var resp = await res.json();
    return resp.regiondata;
  } catch (e) {
    console.log(e);
  }
};
export default GetRegion;
