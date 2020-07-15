from common import Article
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time


def getDzoneURL(topic, pageNumber):

    assert type(pageNumber) == int and pageNumber >= 1
    # f-string formatting will only work on Python 3.6+
    return f'https://dzone.com/{topic}/list?page={pageNumber}'


def loadPage(topic, pageNumber):
    # This function is needed because DZone is written in Angular all components
    # are dynamically JS-rendered.

    # Configure Chrome options
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')

    # So we don't need to actually open a new Window
    options.add_argument('--headless')

    # Instantiate Chromium driver
    driver = webdriver.Chrome(
        "./chromedriver", chrome_options=options)

    driver.get(getDzoneURL(topic, pageNumber))
    time.sleep(1)

    return driver.page_source


def scrapeSource(page_source, keywords):

    # Instantiate BS object
    soup = BeautifulSoup(page_source, 'lxml')

    articleContainers = soup.findAll(
        class_="article-content-right article-toggle")

    articles = []

    for container in articleContainers:
        blurb = ""

        titleAnchor = container.find(class_="article-title article-toggle").a

        title = titleAnchor.string

        link = 'https://dzone.com' + titleAnchor['href']

        date = container.find(
            class_="article-source-date article-toggle").string

        author = container.find(
            class_="author-name ng-binding ng-isolate-scope").string

        article = Article(title, blurb, link, author, date)
        if keywords:
            for keyword in keywords:
                if keyword in blurb or keyword in title:
                    articles.append(Article(title, blurb, link, author, date))
                    break
        else:
            articles.append(Article(title, blurb, link, author, date))

    return articles


def scrape(topic, numPages=2, keywords=None):

    res = []
    for i in range(1, numPages+1):
        ps = loadPage(topic, i)
        res.append(scrapeSource(ps, keywords))
        time.sleep(1)

    # flatten list
    return [item for items in res for item in items]
