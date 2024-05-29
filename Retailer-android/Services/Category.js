import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import metroHost from "./metroHost";
export const getCategory = async () => {
  try {
    let url = `http://192.168.43.188:5000/category`;
    var res = await fetch(url);
    var resp = await res.json();
    return resp.categorydata;
  } catch (e) {
    console.log(e);
  }
};
