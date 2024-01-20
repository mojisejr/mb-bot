export function parseContent(content: string) {
  // Define a regular expression pattern to extract the relevant information
  const pattern =
    /(\d+)\s+([A-Za-z]+)\s+~\s+(\d+\.\d+)\s+([A-Za-z]+)(-?[\d.]+)%/;
  // /(\d+)\s+([A-Za-z]+)\s+~\s+(\d+\.\d+)\s+([A-Za-z]+)-([\d.-]+)%/;

  // Use the regular expression to match the content and extract information
  const match = content.match(pattern);

  if (match) {
    // Create a JavaScript object with the extracted information
    const result = {
      amount: parseFloat(match[1]),
      currency1: match[2],
      exchangeRate: parseFloat(match[3]),
      currency2: match[4],
      percentage: parseFloat(match[5]),
    };

    return result;
  } else {
    console.log("Content does not match the expected pattern.");
    return null;
  }
}
