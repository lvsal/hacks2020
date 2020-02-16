from __future__ import print_function
import mysql.connector
import simplejson as json
import queries as quer
import sys
import scp
import pprint

# Print to stderr
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)



def db_connect():
    print("Connecting to database...")
    try:
        db = mysql.connector.MySQLConnection(
            host="remotemysql.com",
            user="vym2d4siQ9",
            passwd="o85cLdQ8HE",
            database="vym2d4siQ9"
        )
        return db
    except mysql.connector.Error as error:
       eprint("{}".format(error))
    

def prepared_cursor():
    try:
        cursor = db.cursor(buffered=True)
        return cursor
    except:
        eprint("Failed to create MySQLCursor")
        return None

def check_connection():
    global db
    if db == None or not db.is_connected():
        for i in range(5): 
            eprint("Attempting to connect to database. Attempt {}.".format(i+1))
            db = db_connect()
            if not db == None and db.is_connected():
                return True
        if (db == None):
                eprint("Failed connect to database. Please try again later.")
                return False
    return True

def database_commit(): 
    try:
        db.commit()
        return True
    except Exception as error:
       eprint("{}".format(error))
       return False

def update_query(query_name, args=[], multiple=False):

    if not check_connection():
        return False
    query = quer.updater[query_name]
    if multiple == False:
        cursor = prepared_cursor()
        cursor.execute(query, tuple(args))
        return database_commit()
    else:
        for i in range(len(args)):
            cursor = prepared_cursor()
            try:
                cursor.execute(query, args[i])
            except Exception as error:
                eprint(error)
                continue
        database_commit()
        return True
    

def fetch_query(query_name, args=[],size=None):
    if not check_connection():
        return False
    query = quer.fetcher[query_name]
    cursor = prepared_cursor()
    #cursor.execute("SELECT * FROM events;")
    #database_commit()
    #print(cursor.fetchall())
    try:
        if len(args) > 0:
            cursor.execute(query, tuple(args))
        else:
            cursor.execute(query)
        column_names=[x[0] for x in cursor.description]
    except Exception as error:
        eprint(error)
        return False
    if not database_commit():
        return False
    #data = None
    if size == None:
        data = cursor.fetchall()
    else:
        data = cursor.fetchmany(size)
    json_data=[]
    for result in data:
        json_data.append(dict(zip(column_names, [str(r) for r in result])))
    json_string = json.dumps(json_data)
    return json_string

db = db_connect()
#cursor = prepared_cursor()

# def main():
#     """
#     data = scp.getData()
#     if not update_query('update_events', data, True):
#         print("Failed to update query")
#     """
#     json_data = fetch_query('fetch_events')
#     if json_data != False:
#         pp = pprint.PrettyPrinter(indent=4)
#         pp.pprint(json_data)
    

# if __name__== "__main__":
#     main()
