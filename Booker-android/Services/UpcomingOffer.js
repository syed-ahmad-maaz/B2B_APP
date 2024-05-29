import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import metroHost from "./metroHost";
export async function fetchOffer() {
  try {
    let url = `http://192.168.43.188:5000/upcomingoffers`;
    var res = await fetch(url);
    var resp = await res.json();
    return resp.offerCreate;
  } catch (e) {
    console.log(e);
  }
}
