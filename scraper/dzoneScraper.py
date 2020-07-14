from common import Article
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time

DZONE_TOPICS = ["agile-methodology-training-tools-news",
                "artificial-intelligence-tutorials-tools-news",
                "big-data-analytics-tutorials-tools-news",
                "cloud-computing-tutorials-tools-news",
                "database-sql-nosql-tutorials-tools-news",
                "devops-tutorials-tools-news",
                "enterprise-integration-training-tools-news",
                "iot-developer-tutorials-tools-news-reviews",
                "java-jdk-development-tutorials-tools-news",
                "microservices-news-tutorials-tools",
                "open-source-news-tutorials-tools",
                "apm-tools-performance-monitoring-optimization",
                "application-web-network-security",
                "web-development-programming-tutorials-tools-news"]


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


def scrapeSource(page_source):

    # Instantiate BS object
    soup = BeautifulSoup(page_source, 'lxml')

    articleContainers = soup.findAll(
        class_="article-content-right article-toggle")

    print(articleContainers)

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
        articles.append(article)

    return articles


def scrape(topic, numPages=3):

    res = []
    for i in range(1, numPages+1):
        ps = loadPage(topic, i)
        res.append(scrapeSource(ps))
        time.sleep(1)
        print(res)

    # flatten list
    return [item for items in res for item in items]


ps = loadPage("web-development-programming-tutorials-tools-news", 1)
print(scrapeSource(ps))
