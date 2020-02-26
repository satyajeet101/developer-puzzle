import { environment } from '../../environments/environment';

const axios = require('axios');
export class FetchStocks {
  public static fetchQuotes = async (symbol, period) => {
    try {
      const url = `${
        environment.apiURL
      }/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`;
      const response = await axios({
        method: 'GET',
        url: url
      });
      return response.data;
    } catch (error) {
      console.error('Error while fetching stocks: ', error);
      return error;
    }
  };
}
