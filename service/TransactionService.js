import axios from "axios";
import { goerli } from "../models/Chain";

export class TransactionService {
  static API_URL = "https://deep-index.moralis.io/api/v2.2";
  static API_KEY =
    "edwfVPYNcpqbzWbQBlyojSIck5pRjFi1kNsyXLFVos7F7E32HyFk7dc6ZZtfTzDR";

  static async getTransactions(address) {
    const options = {
      method: "GET",
      params: { chain: goerli.name.toLowerCase() },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": TransactionService.API_KEY,
      },
    };

    const response = await fetch(
      `${TransactionService.API_URL}/${address}`,
      options
    );
    const json = await response.json();
    return json;
  }
}

const test = {
  type: "default",
  status: 200,
  ok: true,
  statusText: "",
  headers: {
    map: {
      "access-control-allow-origin": "*",
      "cf-cache-status": "DYNAMIC",
      "cf-ray": "82058e358eeeb2a0-MAA",
      "content-type": "application/json; charset=utf-8",
      date: "Fri, 03 Nov 2023 15:12:27 GMT",
      etag: 'W/"34-0RYA1j7Gi2sa3mMBx5D6iyvX1fk"',
      server: "cloudflare",
      vary: "Accept-Encoding",
      "x-powered-by": "Express",
      "x-request-weight": "5",
    },
  },
  url: "https://deep-index.moralis.io/api/v2/0x96b28Dd06c22383B3C342c7ed156a0eb2f390FCf",
  bodyUsed: false,
  _bodyInit: {
    _data: {
      size: 52,
      offset: 0,
      blobId: "7537abd2-a781-43ea-a91f-39c307713bf2",
      __collector: {},
    },
  },
  _bodyBlob: {
    _data: {
      size: 52,
      offset: 0,
      blobId: "7537abd2-a781-43ea-a91f-39c307713bf2",
      __collector: {},
    },
  },
};
