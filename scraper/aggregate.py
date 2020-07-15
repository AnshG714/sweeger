from common import *
from dzoneScraper import scrape as dzoneScrape
from mediumScraper import scrape as mediumScrape
from youtubeScraper import findVideos
from multiprocessing import Process

# All topics in DZone

DZONE_TOPICS = [
    # "agile-methodology-training-tools-news",
    # "artificial-intelligence-tutorials-tools-news",
    # "big-data-analytics-tutorials-tools-news",
    "cloud-computing-tutorials-tools-news",
    "database-sql-nosql-tutorials-tools-news",
    # "devops-tutorials-tools-news",
    # "enterprise-integration-training-tools-news",
    # "iot-developer-tutorials-tools-news-reviews",
    "java-jdk-development-tutorials-tools-news",
    # "microservices-news-tutorials-tools",
    "open-source-news-tutorials-tools",
    # "apm-tools-performance-monitoring-optimization",
    # "application-web-network-security",
    "web-development-programming-tutorials-tools-news"]

# All the techy topics covered on Medium
MEDIUM_TOPICS = [
    "software-engineering",
    "programming",
    "math",
    #  "machine-learning",
    "javascript",
    "ios-development",
    #  "data-science",
    #  "cybersecurity",
    #  "cryptocurrency",
    #  "blockchain",
    #  "artificial-intelligence",
    "android-development"
]


def scrapeFromSources(keywords: [str]):
    res = []

    def medium():
        for category in MEDIUM_TOPICS:
            print(f'---- Scraping {category} from Medium ---- \n')
            m_results = mediumScrape(category, keywords=keywords)
            print(m_results)
            res.append(m_results)

    def dzone():
        for category in DZONE_TOPICS:
            print(f'---- Scraping {category} from DZone ---- \n')
            d_results = dzoneScrape(category, keywords=keywords)
            print(d_results)
            res.append(d_results)

    def youtube():
        for keyword in keywords:
            print(f'---- Scraping Keyword {keyword} from Youtube ---- \n')
            res.append(findVideos(keyword))

    runInParallel(medium, dzone, youtube)
    print(res)
    return [item for items in res for item in items]


def runInParallel(*fns):
    proc = []
    for fn in fns:
        p = Process(target=fn)
        p.start()
        proc.append(p)
    for p in proc:
        p.join()


print(scrapeFromSources(["Angular"]))
