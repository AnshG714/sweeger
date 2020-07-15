from common import *
import json
import sys
from aggregate import scrapeFromSources


def convertToDict(obj):

    # if not issubclass(type(obj), ContentItem):
    #     raise ValueError(ContentItem)

    dic = {
        'title': obj.title,
        'blurb': obj.blurb,
        'link': obj.link,
        'author': obj.author,
        'datePublished': obj.datePublished
    }

    if issubclass(type(obj), Video):
        dic['thumbnailLink'] = obj.thumbnailLink

    return dic


def compose(obj):
    if type(obj) == list:
        res = []
        for item in obj:
            res.append(convertToDict(item))

        return json.dumps(res)

    return json.dumps(obj)


if __name__ == "__main__":
    # Get list of arguments from command line
    print("Python script called.")
    n = len(sys.argv[1])
    a = sys.argv[1][1:n-1]
    a = a.split(',')
    print("About to start scraping...")
    scraperResults = scrapeFromSources(a)
    composed = compose(scraperResults)
    print(composed)
    sys.stdout.flush()
