from bs4 import BeautifulSoup
import requests
import csv
 
page_to_scrape = requests.get("https://www.primeleague.gg/leagues/teams/175275-iron-better-than-challenger")
soup=BeautifulSoup(page_to_scrape.text, "html.parser")
splits = soup.findAll("div", attrs={"class":"content-subsection-toggle"})
ergebnisse = soup.findAll("span", attrs={"class":"table-cell-container"} )

file = open("scraped_primeleague.csv", "w")
writer = csv.writer(file)

writer.writerow(["SPLITS", "ERGEBNISSE"])

for split, ergebniss in zip(splits, ergebnisse):
    print (split.text + ergebniss.text)
    writer.writerow([split.text, ergebniss.text])
file.close