import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import metroHost from "./metroHost";

const fetchProduct = async (category) => {
  try {
    let url = `http://192.168.43.188:5000/products?CategoryId=${category}`;
    var res = await fetch(url);
    var resp = await res.json();
    return resp.productData;
  } catch (e) {
    console.log(e);
  }
};
export default fetchProduct;
