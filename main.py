from flask_cors import *
from flask import Flask,render_template,request,Response,redirect,url_for
import json
# import couchdb
# couch = couchdb.Server()
# db_address = 'http://admin:123456@172.26.129.187:5984/'
# try:
#     couchServer =  couchdb.Server(db_address)
# except Exception as e:
#     print(e)


app = Flask(__name__)

@app.route('/')
def index():
    #return render_template('HelloWorld.html')
    #return render_template('pie-nest.html')
    return render_template('index.html')

#pie-nest-data
@app.route('/pie_nest_data')
def pie_nest_data():
    data_list = {}
    data1 = ['syd','melb', 'perth', 'bris', 'adle', 'other']
    data_list['data1'] = data1
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



if __name__ == "__main__":
    """run http://127.0.0.1:5000"""
    app.run(host='0.0.0.0', port=5000,debug=True)