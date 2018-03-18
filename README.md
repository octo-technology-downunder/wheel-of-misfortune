# Lambdas

Lambdas are deployed using serverless. You must first set your environment variables:
```
export SLACK_ENDPOINT='https://url.to/slack/integration/endpoint/'
export RASPBERRY_ENDPOINT='https://url.to/raspberry/endpoint/'
```
Then deploy lambda functions:
```
serverless deploy
```

# Raspberry pi

## Sensor wiring

SDL pin -  SDL pin
SDA pin -  SDA pin
+/-3V   -  +/-3V
GND     -  GND

## Motor wiring

To be completed

## Software dependencies

We used a Raspberry Pi Zero W with the latest Raspian image. 
We had to first activate the I2C interface on the raspberry. This can be done with the ``` raspi-config ``` command.
The sources contained in the [raspberry-pi](raspberry-pi/) folder must be copied to the raspeberry.

sudo pip install adafruit-tcs34725 bottle

## Server

The bottle server is started running

```
export RESULT_LAMBDA_ENDPOINT="https://url.to/your/lambda/"
sudo -E python server.py
```

We used [dataplicity](http://dataplicity.com/) to expose our endpoint on Internet. You can also use alternative solutions or port forwading from your wifi router.

# TODO

- refactor and document python code
- improve color handling
- document motor wiring
