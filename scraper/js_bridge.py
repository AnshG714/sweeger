from common import *
import json
import sys


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


def transferToConsole(data):
    print(data)
    sys.stdout.flush()
