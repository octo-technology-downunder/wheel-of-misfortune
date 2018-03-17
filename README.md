#Lambdas

Lambdas are deployed using serverless:
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

## Software dependencies

We used a Raspberry Pi Zero W with the latest Raspian image. 
We had to first activate the I2C interface on the raspberry. This can be done with the ``` raspi-config ``` command.
The sources contained in the [raspberry-pi](raspberry-pi/) folder must be copied to the raspeberry.

pip install time
pip install Adafruit_TCS34725
pip install smbus
pip install sys
pip install time
pip install RPi.GPIO
pip install random
pip install threading
pip install bottle

## Server

The bottle server is started running

```
export LAMBDA_HOST="https://url.to/your/lambda"
sudo -E python server.py
```
