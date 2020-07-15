from common import *
import json
import sys
from aggregate import scrapeFromSources


def convertToJSON(obj):

    if not issubclass(type(obj), ContentItem):
        raise ValueError(ContentItem)

    dic = {
        'title': obj.title,
        'blurb': obj.blurb,
        'link': obj.link,
        'author': obj.author,
        'datePublished': obj.datePublished
    }

    if issubclass(type(obj), Video):
        dic['thumbnailLink'] = obj.thumbnailLink

    return json.dumps(dic)


def compose(obj):
    if type(obj) == list:
        res = []
        for item in obj:
            res.append(convertToJSON(item))

        return res

    return convertToJSON(obj)


if __name__ == "__main__":

    # Get list of arguments from command line
    n = len(sys.argv[1])
    a = sys.argv[1][1:n-1]
    a = a.split(',')

    scraperResults = scrapeFromSources(a)
    composed = compose(scraperResults)
    print(composed)
    sys.stdout.flush()
