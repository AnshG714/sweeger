from common import *
from dzoneScraper import scrape as dzoneScrape
from mediumScraper import scrape as mediumScrape
from youtubeScraper import findVideos

# All topics in DZone
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

# All the techy topics covered on Medium
MEDIUM_TOPICS = ["technology", "software-engineering",
                 "self-driving-cars", "programming", "math",
                 "machine-learning", "javascript", "ios-development", "data-science",
                 "cybersecurity", "cryptocurrency", "blockchain", "artificial-intelligence",
                 "android-development"]
