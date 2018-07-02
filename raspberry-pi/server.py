#!/usr/bin/python

import requests
import os
from threading import Thread
from bottle import route, run, response
from spinMotor import spin_motor
from readColor import read_color

def notify_lambda(colors):
    path = 'dev/color/' + '-'.join(colors) + '/default'
    endpoint = os.environ['RESULT_LAMBDA_ENDPOINT'] + path
    http_response = requests.get(endpoint)
    print('Lambda call status code {0}'.format(http_response.status_code))
    return http_response.status_code

def spin_wheel(spin_counts):
    colors = []
    for spin_index in range(spin_counts):
        print('Starting spin #{0}...'.format(str(spin_index + 1)))
        spin_motor()
        colors.append(read_color())
    print('Colors returned by sensor: {0}'.format(colors))
    notify_lambda(colors)

def invoke_spin_wheel(spin_counts):
    thread = Thread(target = spin_wheel, args = [spin_counts])
    thread.start()

@route('/spinthewheel/<spin_counts>')
def index(spin_counts):
    invoke_spin_wheel(int(spin_counts))
    return 'The wheel will spin {0} time(s)!'.format(spin_counts)

run(host='localhost', port=80)
