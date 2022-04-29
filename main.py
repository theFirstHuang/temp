from flask_cors import *
from flask import Flask,render_template,request,Response,redirect,url_for
import json
import couchdb
couch = couchdb.Server()
#CouchDB
db_address1 = 'http://admin:123456@172.26.129.187:5984/'
#CouchDB_1
db_address2 = 'http://admin:123456@172.26.132.252:5984/'
#CouchDB_2
db_address2 = 'http://admin:123456@172.26.128.202:5984/'


app = Flask(__name__)

@app.route('/')
def index():
    #return render_template('pie-nest.html')
    return render_template('index.html')

#pie-nest-data
@app.route('/pie_nest_data')
def pie_nest_data():
    data_list = {}
    data10 = ['syd','melb', 'perth', 'bris', 'adle', 'other']
    data_list['data_legend'] = data10

    data_line = [1,20,3,4,5]
    data_list['data_line'] = data_line
    data_list['data10'] = data_line
    data2 = [
                {'value': 2000, 'name': 'syd', 'selected': True},
                {'value': 1548, 'name': 'melb'},
                {'value': 775, 'name': 'perth'},
                {'value': 679, 'name': 'bris'},
                {'value': 15, 'name' : 'adle'},
                {'value':150, 'name' : 'other'}
            ]
    data_list['data2'] = data2
    data3 =[
                {'value': 1048, 'name': 'baidu'},
                {'value': 335, 'name': 'google'},
                {'value': 310, 'name': 'apple'},
                {'value': 251, 'name': 'yahoo'},
                {'value': 234, 'name': 'bing'},
                {'value': 147, 'name': 'amaz'},
                {'value': 135, 'name': 'tsla'},
                {'value': 502, 'name': 'twtr'}
            ]
    data_list['data3'] = data3
    return Response(json.dumps(data_list), mimetype='application/json')

#for line chart example
@app.route('/chart_data')
def chart_data():
    data_list = {}
    data_line = [100,25,3000,40,500]
    data_list['data_line'] = data_line
    return Response(json.dumps(data_list), mimetype='application/json')

#retrive government data from CouchDB
@app.route('/gov_data')
def gov_data():
    data_list = {}
    try:
        couchServer =  couchdb.Server(db_address1)
    except Exception as e:
        print(e)
    db = couchServer['government_result']
    counter = 0
    for id in db:
        if counter > 4:
            break
        str = json.dumps(db[id])
        data = json.loads(str)
        print(data)
        city_checker(data['city'],data_list,data)
        counter += 1
    return Response(json.dumps(data_list), mimetype='application/json')

def city_checker(city_name,data_list,data):
    if city_name == 'mel':
        data_list['mel'] = data
    if city_name == 'syd':
        data_list['syd'] = data
    if city_name == 'bris':
        data_list['bris'] = data
    if city_name == 'adle':
        data_list['adle'] = data
    return data_list

if __name__ == "__main__":
    """run http://127.0.0.1:2889"""
    gov_data()
    app.run(host='0.0.0.0', port=2889,debug=True)