# Python
import pandas as pd
from fbprophet import Prophet
# Python
df = pd.read_csv('train.csv')
df.head()
# Python
m = Prophet()
m.fit(df)
future = m.make_future_dataframe(periods=1)
future.tail()
forecast = m.predict(future)
print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail())
fig1 = m.plot(forecast)
