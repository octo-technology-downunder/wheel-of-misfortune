This code is about the *Wheel of Misfortune*, a product we built over a Coding Night at OCTO Technology. We have these Coding Nights every couple of months, and we use them to build a funny product ideas we have, usually something phyisical, not just an app, from afterwork till late. There are still some adjusments to do for the code to be maintainable, and for this wheel to be perfect, so we'll keep contributing to it. Don't hesitate to do it as well :) 

Find the whole [story here](https://medium.com/@ericfavre/the-wheel-of-misfortune-d19de190c60c)

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

We used a Raspberry Pi Zero W.

## Sensor wiring

- SDL pin <->  SDL pin
- SDA pin <->  SDA pin
- +/-3V   <->  +/-3V
- GND     <->  GND

## Motor wiring

To be completed

## Software

We installed the latest Raspian image. 
We had to first activate the I2C interface on the raspberry. This can be done with the ``` raspi-config ``` command.
The sources contained in the [raspberry-pi](raspberry-pi/) folder must be copied to the raspeberry.
They depend on the 2 following python modules:

```
sudo pip install adafruit-tcs34725 bottle
```

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

# Contributors

This repository is the merging of 3 different private repositories, from which some commits could not be publicly available. So the history is clear. But the contributors to this piece of work are:

- [Arthur Baudry](https://github.com/ArthurBaudry)
- [Ben Lachs]()
- [Cédric Nicoloso](https://github.com/cedric25)
- [David Alia](https://github.com/byalpel)
- [Eric Favre](https://github.com/efavre)
- [Erwan Alliaume](https://github.com/ealliaume)
- [Ilya Trofimov](https://github.com/ilya-v-trofimov)
- [Manon Souris](https://github.com/Manonmao)
- [Mykyta Shulhin](https://github.com/NickitaX)
- [Nicolas Pascal](https://github.com/nipasoz13)
- [Tristan Le Guillou](https://github.com/t-leguillou)
- [Wei Pang](https://github.com/weipang)
- [William Ong](https://github.com/wyam)
- [William Thomson](https://github.com/wjt866)
