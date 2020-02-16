import requests
from bs4 import BeautifulSoup

URL = 'https://www.ucalgary.ca/events/all'
page = requests.get(URL)


htmlFile = open("events.html")
html = htmlFile.read() 
soup = BeautifulSoup(html, 'html.parser')

# print(soup.prettify())

for div in soup.findAll('p', attrs={'class':'title'}):
    # print(div)
    print(" ".join(((div.find('a').contents[0])).split()))

events = []


#  <div class="event-deets">
#                                 <p class="time-loc">
#                                     <span>Feb 15</span>

#                                     <span>Multiday Event</span>


#                                     <span>
#                                         <span>All Day</span>
#                                         <span></span>
#                                     </span>
#                                     <span>Nickle Galleries, Taylor Family Digital Library</span>
#                                 </p>

#                                 <p class="title"><a
#                                         href="https://events.ucalgary.ca/ucalgary-news/#!view/event/event_id/18042">Diana
#                                         Thorneycroft: Black Forest (dark waters): Exhibition</a></p>

#                                 <div class="desc">

#                                     <p>
#                                         <strong>Diana Thorneycroft acknowledges support for the exhibition and tour from
#                                             the Canada Council for the Arts, Manitoba Arts Council and Winnipeg Arts
#                                             Council.</strong>
#                                     </p>

#                                 </div>
#                             </div>
#                         </div>

#                     </div>



# [Title, Date, start, end, Location, Description]
for div in soup.findAll('div', attrs={'class':'event-deets'}):
    # print(div) 'div', {"class" : "col-sm-8 events-display-area"}
    # print(" ".join(((div.find('a').contents[0])).split()))

    # Title
    # print(" ".join((div.find('p', {"class" : "title"})).find('a').contents[0].split()))

    # Description
    # print(" ".join((div.find('div',{"class" : "desc"}).getText()).split()))
    # events.append([" ".join((div.find('p', {"class" : "title"})).find('a').contents[0].split()), ])

    # Date

    # print("new event")
    title = " ".join((div.find('p', {"class" : "title"})).find('a').contents[0].split())
    descrip = " ".join((div.find('div',{"class" : "desc"}).getText()).split())

    time = div.find('p', {"class" : "time-loc"}).find_all('span')
    # print(time)
    date = time[0].getText()
    # print("Time", time[1].getText())
    
    # print("Location", time[2].getText())
    # print("start", time[-3].getText()) 
    # print("end", time[-2].getText()) 
    # print("loc", time[-1].getText()) 

    # break; 

    start = time[-3].getText()
    end = time[-2].getText()
    location = time[-1].getText()

    events.append([title, date, start, end, location, descrip])





# yyyy-mm-dd

#     time: hh:mm:ss

# def getTime(str):
#     if str = " ":
#         return str
#     elif 


# convert24 and convert24END
# reference used: https://www.geeksforgeeks.org/python-program-convert-time-12-hour-24-hour-format/
def convert24(str1): 
    if str1 == "":
        return str1
    elif str1 == "All Day":
        return "00:00"
      
    # Checking if last two elements of time 
    # is AM and first two elements are 12 
    elif str1[-2:] == "a.m." and str1[:2] == "12": 
        return "00" + str1[2:-2] 
          
    # remove the AM     
    elif str1[-2:] == "a.m.": 
        return str1[:-2] 
      
    # Checking if last two elements of time 
    # is PM and first two elements are 12    
    elif str1[-2:] == "p.m." and str1[:2] == "12": 
        return str1[:-2] 
          
    else: 
        if str1[1] == ":":
            return str(int(str1[:1]) + 12) + str1[1:-4] 
        else:
        # add 12 to hours and remove PM 
            return str(int(str1[:2]) + 12) + str1[2:-4] 


def convert24END(str1): 
    if str1 == "":
        return str1
    elif str1 == "All Day":
        return "23:59"
      
    # Checking if last two elements of time 
    # is AM and first two elements are 12 
    elif str1[-2:] == "a.m." and str1[:2] == "12": 
        return "00" + str1[2:-2] 
          
    # remove the AM     
    elif str1[-2:] == "a.m.": 
        return str1[:-2] 
      
    # Checking if last two elements of time 
    # is PM and first two elements are 12    
    elif str1[-2:] == "p.m." and str1[:2] == "12": 
        return str1[:-2] 
          
    else: 
        if str1[1] == ":":
            return str(int(str1[:1]) + 12) + str1[1:-4] 
        else:
        # add 12 to hours and remove PM 
            return str(int(str1[:2]) + 12) + str1[2:-4] 


def getDateSQL(str):
    if str[:3] == "Mar":
        return "2020-3" + "-" + str[4:] 
    elif str[:3] == "Feb":
        return "2020-2" + "-" + str[4:]

for i in events:
    i[1] = getDateSQL(i[1])
    # print(i[1])
    i[2] = convert24(i[2])
    i[3] = convert24END(i[3])
    # print(convert24END(i[3]))
    print(i)






    # Location 

