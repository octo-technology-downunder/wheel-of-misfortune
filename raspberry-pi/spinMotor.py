import sys
import time
import RPi.GPIO as GPIO
import random

def random_steps():
    mean = 1
    stddev = 3
    result = int(2048 * (mean + random.random() * stddev))
    return result

def spin_motor():
    GPIO.setmode(GPIO.BCM)
    step_pins = [4, 17, 23, 24]

    for pin in step_pins:
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, False)

    seq = [[1, 0, 0, 1],
           [1, 1, 0, 0],
           [0, 1, 1, 0],
           [0, 0, 1, 1]]

    step_count = len(seq)
    spin_clockwise = 1
    min_wait_time = 17
    wait_time = 100
    accelerate_factor = 3
    factor_cntr = 0
    total_steps_cnt = random_steps()
    step_counter = 0

    for itr in range(0, total_steps_cnt):

        for pin in range(0, 4):
            xpin = step_pins[pin]
            if seq[step_counter][pin] != 0:
                GPIO.output(xpin, True)
            else:
                GPIO.output(xpin, False)

        step_counter += spin_clockwise

        if step_counter >= step_count:
            step_counter = 0
        if step_counter < 0:
            step_counter = step_count + spin_clockwise

        time.sleep(wait_time/float(10000))
        if wait_time > min_wait_time:
            if factor_cntr > accelerate_factor:
                factor_cntr = 0
                wait_time = wait_time - 1
            else:
                factor_cntr = factor_cntr + 1

    GPIO.cleanup()
    print "Reset pins at the end of work"
