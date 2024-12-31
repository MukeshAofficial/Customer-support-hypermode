import { http } from "@hypermode/modus-sdk-as";

export function callStockPriceApi(symbol: string): string {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey={{MODUS_API_KEY}}`;
  const req = new http.Request(url);
  const resp = http.fetch(req);

  if (!resp.ok) {
    throw new Error(`Failed to fetch stock price. Received: ${resp.status} ${resp.statusText}`);
  }

  const responseText = resp.text();
  console.log(responseText);

  return responseText;
}