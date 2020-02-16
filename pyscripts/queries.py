# Queries
auth = """"""
test = """SELECT * FROM test_table WHERE eventname=%s;"""
update_events = """INSERT INTO events (eventname, date, starttime, endtime, location, description) values(%s, %s, %s, %s, %s, %s)"""
fetch_events = """SELECT * FROM events ORDER BY date"""


fetcher = {
        'auth': auth,
        'test': test,
        'fetch_events': fetch_events
    }

updater = {
    'update_events': update_events,
}

#eventname, date, starttime, endtime, location, description
"""
create table events (
	eventname char,
    date date,
    starttime time,
    endtime time,
    location char,
    description text,
    primary key(eventname, date, starttime)
)
"""