from common import ContentItem
import requests

SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
VIDEO_URL = 'https://www.youtube.com/watch?v='

class Video(ContentItem):
    def __init__(self, title: str, blurb: str, link: str, author: str, datePublished: str, thumbnailLink: str):
        super().__init__(title,blurb,link,author,datePublished)
        self.thumbnailLink = thumbnailLink

API_KEY = ''
with open("../env/.env") as f:
    content = f.readlines()
    for data in content:
        data_split = data.strip().split(': ')

        if data_split[0].upper() == 'YOUTUBE_API_KEY':
            API_KEY = data_split[-1]

'''
Return a list of videos for the search term
order: Most likely either 'date' or 'relevance' (see YouTube Data API for more options)
max_results: Maximum number of videos to return
'''
def findVideos(search, order="date", max_results=5):
    videos = list()

    # Make search query via YouTube Data API
    params = dict()
    params['part'] = 'snippet'
    params['maxResults'] = max_results
    params['order'] = order
    params['q'] = search
    params['type'] = 'video' # only search for videos (i.e no channels/playlists)
    params['key'] = API_KEY
    
    r = requests.get(SEARCH_URL, params)

    data = r.json()

    # Parse JSON result
    for item in data['items']:
        title = item['snippet']['title']
        blurb = item['snippet']['description']
        link = ''.join([VIDEO_URL,item['id']['videoId']])
        author = item['snippet']['channelTitle']
        datePublished = item['snippet']['publishTime']
        thumbnailLink = item['snippet']['thumbnails']['high']['url']

        videos.append(Video(title,blurb,link,author,datePublished, thumbnailLink))

    return videos

print(findVideos('TensorFlow')) 
