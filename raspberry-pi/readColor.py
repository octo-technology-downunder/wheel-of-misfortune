# Simple demo of reading color data with the TCS34725 sensor.
# Will read the color from the sensor and print it out along with lux and
# color temperature.
# Author: Tony DiCola
# License: Public Domain

import time
import Adafruit_TCS34725
import smbus

def read_color():
    sensor = Adafruit_TCS34725.TCS34725()
    sensor.set_interrupt(False)

    red, green, blue, clear = sensor.get_raw_data()
    # Calculate color temperature using utility functions.  You might also want to
    # check out the colormath library for much more complete/accurate color functions.
    color_temperature = Adafruit_TCS34725.calculate_color_temperature(red, green, blue)
    # Calculate lux with another utility function.
    lux = Adafruit_TCS34725.calculate_lux(red, green, blue)

    print('Color: red={0} green={1} blue={2} clear={3}'.format(red, green, blue, clear))

    if color_temperature is None:
        print('Too dark to determine color temperature!')
    else:
        print('Color Temperature: {0} K'.format(color_temperature))

    print('Luminosity: {0} lux'.format(lux))

    sensor.set_interrupt(True)
    sensor.disable()

    return '{0}{1}{2}'.format(red, green, blue)
