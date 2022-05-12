# -*- coding: utf-8 -*-
"""
Created on Sat Apr 30 03:24:57 2022

@author: gxa210001
"""

# Importing module
import mysql.connector
import json
import collections
import jsonify
# import psycopg2
import requests
from flask import Flask, jsonify, render_template, request

# import webbrowser
# import time

_name_ = 'backend_api'

app = Flask(_name_)

objects_list = []

mydb = mysql.connector.connect(
        host="localhost",
        port = 3306,
        user="root",
        password="root",
        database="StackOverflow2010"
)

@app.route('/test')
def index():

    mycursor = mydb.cursor()

    mycursor.execute("select AnswerCount,Body from posts_temp;")

    rows = mycursor.fetchall()

    rowarray_list = []
    for row in rows:
        t = (row[0], row[1], row[2], row[3])
        rowarray_list.append(t)

    j = json.dumps(rowarray_list)

    with open("student_rowarrays.js", "w") as f:
        f.write(j)

    # Convert query to objects of key-value pairs
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d["Answer"] = row[0]
        d["Body"] = row[1]
        objects_list.append(d)
    print(ojects_list)
    """j = json.dumps(objects_list)
    print(type(json.dumps(objects_list)))
    print(j)"""
    return (jsonify(objects_list))
    """with open("student_objects.js", "w") as f:
        f.write(j)"""


# @app.route('/test1')
@app.route('/search', methods = ['POST'])
def process_json():
    data = json.loads(request.data)
    # print(data)
    print("Query : " + data['query'])

    # original working code
    # return data
    return "OK"


if __name__ == '__main__':
    app.run()