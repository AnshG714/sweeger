import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time
from common import Article
import os

BASE_MEDIUM_URL = "https://medium.com/topic/"
BASE_DEV_TO_URL = "https://dev.to/search?q="
WEBSITE_MEDIUM = "https://medium.com"
WEBSITE_DEV = "https://dev.to"


def getMediumURL(topic):
    return BASE_MEDIUM_URL + topic


def getDevURL(topic):
    return BASE_DEV_TO_URL + topic


def fetchWebPageSourceAfterScroll(url, numScrolls=9):

    # Configure Chrome options
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    # So we don't need to actually open a new Window
    options.add_argument('--headless')

    # Instantiate Chromium driver
    driver = webdriver.Chrome(
        os.path.join(os.path.dirname(os.path.abspath(__file__)),
                     '..', 'scraper', 'chromedriver'),
        chrome_options=options)

    # Load the URL
    driver.get(url)
    time.sleep(1)
    count = 0
    while count <= numScrolls:
        # Get the last such instance of this URL

        if BASE_MEDIUM_URL in url:
            allSections = driver.find_elements_by_tag_name('section')
        else:
            allSections = driver.find_elements_by_tag_name('article')
        lastElement = allSections[-1]
        driver.execute_script("arguments[0].scrollIntoView();", lastElement)
        time.sleep(0.5)
        count += 1

    return driver.page_source


def findArticles(page_source, keywords):

    # Initialize BeautifulSoup object
    soup = BeautifulSoup(page_source, 'lxml')

    # Get all section tags with the given class
    articleContainers: bs4.element.ResultSet = soup.findAll(
        class_="hh hi fb n hj hk hl hm hn al")

    articles = []

    for container in articleContainers:
        # print(container)
        # Get title link
        link = str(container.find('a')['href'])
        if link[0] == '/':
            link = "https://www.medium.com" + link

        # Get blurb of article
        blurb = str(container.find(
            class_="cc gb gc gd av ge eh as ei au ch").a.string)

        # Find the name of the Author
        authorDetailContainer = container.find(
            class_="cc b cd ce cf cg as av ek eh ei au ap q")
        author = str(authorDetailContainer.find('a').string)

        # Get date of publishing
        date = str(container.find(class_="gp n cn").find(
            text=True, recursive=False))

        # Get title of article

        titleContainer = container.find(
            class_="ap q eb cc ec cd gd hp hq as av ge eh ei au") or container.find(class_="ap q fs bv ft bw hd io ip as av he ch fy au")
        try:
            title = str(titleContainer.a.string)
        except:
            print("error occured in", str(soup.find('title').string))

        if keywords:
            for keyword in keywords:
                if keyword in blurb or keyword in title:
                    articles.append(Article(title, blurb, link, author, date))
                    break
        else:
            articles.append(Article(title, blurb, link, author, date))

    return articles


def findArticlesDev(page_source, keyword=None):

    # Initialize BeautifulSoup object
    soup = BeautifulSoup(page_source, 'lxml')

    # Get all section tags with the given class
    articleContainers: bs4.element.ResultSet = soup.findAll(
        class_="crayons-story")

    articles = []

    #print("Our article containers:")
    # for i in articleContainers:
    # print(i)
    # print("\n")
    num = 0

    for container in articleContainers:
        if container.find(class_="crayons-story__flare-tag"):
            continue
        # Get title link
        link = str(container.find(
            class_="crayons-story__title").find('a')['href'])
        #print("Our link is ")
        # print(link)

        # Get blurb of article
        blurb = ""

        # Find the name of the Author
        author = container.find(
            class_="crayons-story__secondary fw-medium").string

        # Get date of publishing
        date = container.find(
            class_="crayons-story__tertiary fs-xs").find('time').string

        # Get title of article
        title = str(container.find(
            class_="crayons-story__title").a.string)

        articles.append(Article(title, blurb, link, author, date))
        num = num+1

    return articles


def scrape(topic, keywords=None):
    ps = fetchWebPageSourceAfterScroll(getMediumURL(topic))
    articles = findArticles(ps, keywords)
    return articles


if __name__ == "__main__":
    scrape("programming")
