from pyisemail import is_email
import mysql.connector
import time
import datetime
import hashlib

success = 0
err = ""

def get_success():
    return (success, err)


class Create_User:

    def __init__(self, email_add, password, username):
        global err
        global success
        connection = mysql.connector.connect(host='remotemysql.com',
                                             database='vym2d4siQ9',
                                             user='vym2d4siQ9',
                                             password='o85cLdQ8HE')

        ps_con = connection.cursor(prepared=True)

        sql_insert_query = """INSERT INTO users(Username, Password, register_date, Email) VALUES (%s,%s,%s,%s)"""
        result = self.check_add(email_add)
        if result:
            hash = hashlib.sha256()
            hash.update(bytearray(password, 'utf-8'))
            pass_h = hash.hexdigest()
            ts = time.time()
            timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
            to_insert = (username, pass_h, timestamp, email_add)
            try:
                ps_con.execute(sql_insert_query, to_insert)
                connection.commit()
            except mysql.connector.Error as error:
                print("parameterized query failed {}".format(error))
                err = "Account already exists"
            finally:
                if connection.is_connected():
                    ps_con.close()
                    connection.close()
                    if err == "":
                        success = 1
        else:
            err = "Invalid Address"


    def check_add(self, address):
        result = is_email(address, check_dns=True)
        detailed_result = is_email(address, check_dns=True, diagnose=True)
        return result

class Login:

    def __init__(self, user, password):
        global err
        global success
        connection = mysql.connector.connect(host='remotemysql.com',
                                             database='vym2d4siQ9',
                                             user='vym2d4siQ9',
                                             password='o85cLdQ8HE')

        ps_con = connection.cursor(buffered = True)
        hash = hashlib.sha256()
        hash.update(bytearray(password, 'utf-8'))
        pass_h = hash.hexdigest()
        query = """SELECT Password FROM users WHERE Username=%s"""
        to_ask = (user,)
        try:
            ps_con.execute(query, to_ask)
            connection.commit()
            data_hash = ps_con.fetchall()
            if len(data_hash) == 0:
                err = "Account does not exist"
            elif (pass_h != data_hash[0][0]):
                err = "Incorrect password"
        except mysql.connector.Error as error:
            print("parameterized query failed {}".format(error))
            err = "Could not login. Try again"
        finally:
            if connection.is_connected():
                ps_con.close()
                connection.close()
                if err == "":
                    success = 1



