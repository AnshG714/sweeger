class ContentItem:
    """
    A general class to represent any form of content (video, article, etc.)
    """

    def __init__(self, title: str, blurb: str, link: str, author: str, datePublished: str):
        qmark_index = link.find('?')
        self.title = title
        self.blurb = blurb
        self.link = link#[:qmark_index]
        self.author = author
        self.datePublished = datePublished

    def __str__(self):
        # f-string formatting will only work on Python 3.6+
        return f'{{Title: {self.title}, Blurb: {self.blurb}, Link: {self.link}, Author: {self.author}, Date Published: {self.datePublished}}}'

    def __repr__(self):
        return self.__str__()


class Article(ContentItem):
    """
    A general class to represent an article, paves way for better abstraction
    """

    def __init__(self, title: str, blurb: str, link: str, author: str, datePublished: str):
        super().__init__(title, blurb, link, author, datePublished)


class Video(ContentItem):
    def __init__(self, title: str, blurb: str, link: str, author: str, datePublished: str, thumbnailLink: str):
        super().__init__(title, blurb, link, author, datePublished)
        self.thumbnailLink = thumbnailLink
