import pandas as pd
from fbprophet import Prophet
import numpy as np
import json
import datetime
import dateutil.parser
from flask import Flask

df = pd.read_csv('train-Copy.csv')

m = Prophet()
m.fit(df)


future = m.make_future_dataframe(periods=7)
forecast = m.predict(future)


ds1 = forecast['ds'].tail(7)
yhat1 = forecast['yhat'].tail(7)



class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

ds = np.array(ds1)
yhat = np.array(np.float64(yhat1))

print(ds.shape)
print(yhat.shape)


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

print(ds0_json)

json_dump = json.dumps({'ds0':ds0_json,'yhat0':yhat[0],'ds1':ds1_json,'yhat1':yhat[1],'ds2':ds2_json,'yhat2':yhat[2],'ds3':ds3_json,'yhat3':yhat[3],'ds4':ds4_json,'yhat4':yhat[4],'ds5':ds5_json,'yhat5':yhat[5],
                      'ds6':ds6_json,'yhat6':yhat[6]}, cls=NumpyEncoder)
print(json_dump)



app = Flask(__name__)
app.config["DEBUG"] = True
@app.route("/", methods=['POST'])
def hello():
    return json_dump

