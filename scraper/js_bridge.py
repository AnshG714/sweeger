from common import *
import json


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
