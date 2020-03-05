import pandas as pd
import numpy as np
import json
from flask import Flask
from flask_cors import CORS

import datetime

df = pd.read_csv('train-Copy.csv')
df.plot()
ds1 = df['ds'].tail(7)
y1 = df['y'].tail(7)
ds = np.array(ds1)
y = np.array(np.float64(y1))

ds0 = pd.to_datetime(ds[0])
ds1 = pd.to_datetime(ds[1])
ds2 = pd.to_datetime(ds[2])
ds3 = pd.to_datetime(ds[3])
ds4 = pd.to_datetime(ds[4])
ds5 = pd.to_datetime(ds[5])
ds6 = pd.to_datetime(ds[6])


def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

ds0_json = json.dumps(ds0, default = myconverter)
ds1_json = json.dumps(ds1, default = myconverter)
ds2_json = json.dumps(ds2, default = myconverter)
ds3_json = json.dumps(ds3, default = myconverter)
ds4_json = json.dumps(ds4, default = myconverter)
ds5_json = json.dumps(ds5, default = myconverter)
ds6_json = json.dumps(ds5, default = myconverter)

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

json_dump = json.dumps({'ds0':ds0_json,'y0':y[0],'ds1':ds1_json,'y1':y[1],'ds2':ds2_json,'y2':y[2],'ds3':ds3_json,'y3':y[3],'ds4':ds4_json,'y4':y[4],'ds5':ds5_json,'y5':y[5],
                      'ds6':ds6_json,'y6':y[6]}, cls=NumpyEncoder)
print(json_dump)

app = Flask(__name__)
#if __name__ == "__main__":
#    app.run(host='132.186.199.33 ',port='80')
app.config["DEBUG"] = False
cors = CORS(app, resources={r"/*": {"origins": "*"}})
@app.route("/historical", methods=['GET'])
def hello():
    return json_dump