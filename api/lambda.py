import json
import datetime as dt
import yfinance as yf

def lambda_handler(event, context):
    print("PRINT",event.get("name", []))
    result ={}
    stocks_arr =event.get("name", [])
    if len(stocks_arr) > 0:
      for name in stocks_arr:

        periodinput =365
        TODAY = "2022-08-01"
        TODAY = (dt.datetime.today()+ dt.timedelta(1)).strftime('%Y-%m-%d') 
        datetime_object = dt.datetime.strptime(TODAY, '%Y-%m-%d')
      
        ohlcv = yf.download(stocks_arr[0] +'.NS',datetime_object -dt.timedelta(periodinput),datetime_object)
        arr_close = ohlcv['Close'].values
        result[name] = arr_close.tolist()
     
      return {
          'statusCode': 200,
          'body': result
      }
    else:
      return {
          'statusCode': 200,
          'body': json.dumps('NO DATA ')
      }
