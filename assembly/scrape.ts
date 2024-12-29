import { http } from "@hypermode/modus-sdk-as";

@json
class ScrapedContent {
  @alias("text")
  quote!: string;
}

export function getScrapedContent(url: string): ScrapedContent {
  const scrapeRequest = new http.Request(`http://localhost:5000/webscrape?url=${url}`);

  const scrapeResponse = http.fetch(scrapeRequest);
  if (!scrapeResponse.ok) {
    throw new Error(
      `Failed to scrape content. Received: ${scrapeResponse.status} ${scrapeResponse.statusText}`
    );
  }

  const request = new http.Request(`http://localhost:5000/get-scraped-text`);

  const response = http.fetch(request);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch scraped content. Received: ${response.status} ${response.statusText}`
    );
  }

  const scrapedContents = response.json<ScrapedContent[]>();
  return scrapedContents[scrapedContents.length - 1]; 
}
