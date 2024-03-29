import videoTestData from '../data/videos.json';
import { getWatchedVideos, getMyListVideos } from './db/hasura';

const fetchVideos = async (url) => {

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = 'youtube.googleapis.com/youtube/v3';
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    return  await response.json();
}

export const getCommonVideos = async (url) => {
  // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=[YOUR_API_KEY]

  try{
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url);

  if (data?.error) {
    console.error('youtube API error', data.error);
    return [];
  }
  
  return (
    data?.items.map( (item) => {
      const id = item.id?.videoId || item.id;

      const snippet = item.snippet;

      return {
        title: snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : {viewCount: 0},
      };
    })
  )} catch(error) {
    console.error("there was an error fetching videos", error);
    return [];
  }
};

  // https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY]

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}`

  return getCommonVideos(URL);
};

export const getPopularVideos = async () => {

  const URL = 
  'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US';

  //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc

  return getCommonVideos(URL);
};
export const getYoutubeVideoById = async (videoId) => {

  const URL = 
  `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    }
  })
}

export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    }
  })
}