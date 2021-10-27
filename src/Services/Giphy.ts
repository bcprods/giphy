import axios from 'axios';

abstract class GiphyService {
  public static key = 'YSGOgnpb0h04e2hRPQ1nUnWmc1aze0l5';

  public static searchGiphyAsync = async (term: string) => axios
    .get(`https://api.giphy.com/v1/gifs/search?api_key=YSGOgnpb0h04e2hRPQ1nUnWmc1aze0l5&q=${term}&limit=25&offset=0&rating=g&lang=en`);
}

export default GiphyService;
