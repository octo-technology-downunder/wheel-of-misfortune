import time
import Adafruit_TCS34725
import smbus

def read_color():
    sensor = Adafruit_TCS34725.TCS34725()
    sensor.set_interrupt(False)
    red, green, blue, clear = sensor.get_raw_data()
    sensor.set_interrupt(True)
    sensor.disable()
    print('RGBC read by sensor: {0}_{1}_{2}_{3}'.format(red, green, blue, clear))
    return '{0}_{1}_{2}_{3}'.format(red, green, blue, clear)
