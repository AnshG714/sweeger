import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time
from common import Article

BASE_URL = "https://medium.com/topic/"

# All the techy topics covered on Medium
TOPICS = ["technology", "software-engineering",
          "self-driving-cars", "programming", "math",
          "machine-learning", "javascript", "ios-development", "data-science",
          "cybersecurity", "cryptocurrency", "blockchain", "artificial-intelligence",
          "android-development"]

# set to topic/programming for now, but we can extend it to 0ther topics in medium
# easily, since the DOM is more or less the same.
MEDIUM_URL = BASE_URL + "programming"


def fetchWebPageSourceAfterScroll(url, numScrolls=9):

    # Configure Chrome options
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    # So we don't need to actually open a new Window
    options.add_argument('--headless')

    # Instantiate Chromium driver
    driver = webdriver.Chrome(
        "./chromedriver", chrome_options=options)

    # Load the URL
    driver.get(url)
    count = 0
    while count <= numScrolls:
        # Get the last such instance of this URL
        allSections = driver.find_elements_by_tag_name('section')
        lastElement = allSections[-1]
        driver.execute_script("arguments[0].scrollIntoView();", lastElement)
        time.sleep(0.5)
        count += 1

    return driver.page_source


def findArticles(page_source, keywords=None):

    # Initialize BeautifulSoup object
    soup = BeautifulSoup(page_source, 'lxml')

    # Get all section tags with the given class
    articleContainers: bs4.element.ResultSet = soup.findAll(
        class_="hh hi fb n hj hk hl hm hn al")

    articles = []

    for container in articleContainers:
        # Get title link
        link = str(container.find('a')['href'])

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
        title = str(container.find(
            class_="ap q eb cc ec cd gd hp hq as av ge eh ei au").a.string)

        if keywords:
            for keyword in keywords:
                if keyword in blurb or keyword in title:
                    articles.append(Article(title, blurb, link, author, date))
                    break

    return articles


def scrape(url, keywords):
    ps = fetchWebPageSourceAfterScroll(url)
    articles = findArticles(ps, keywords=keywords)


if __name__ == "__main__":
    scrape(MEDIUM_URL)
