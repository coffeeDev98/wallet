import axios from "axios";
import { GECKO_API_URL } from "../constants";

export const geckoGetPrice = async () => {
  const url = `${GECKO_API_URL}/simple/price`;
  const options = {
    method: "GET",
    url,
    params: {
      ids: "ethereum,bitcoin,binancecoin",
      vs_currencies: "inr",
    },
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios(options);
  return res.data;
};
