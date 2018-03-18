import time
import Adafruit_TCS34725
import smbus

def read_color():
    sensor = Adafruit_TCS34725.TCS34725()
    sensor.set_interrupt(False)
    red, green, blue, clear = sensor.get_raw_data()
    sensor.set_interrupt(True)
    sensor.disable()
    return '{0}{1}{2}'.format(red, green, blue)
