from common import *
import json
import sys

a = Article('hey', 'ewiw', 'nweovn', 'ronvr', 'eronr')
b = Video('hey', 'ewiw', 'nweovn', 'ronvr', 'eronr', 'ejwenvonow')


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


def transferToConsole(data):
    print(data)
    sys.stdout.flush()
