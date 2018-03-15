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
    # Use BCM GPIO references
    # instead of physical pin numbers
    GPIO.setmode(GPIO.BCM)

    # Define GPIO signals to use
    # GPIO4,GPIO17,GPIO23,GPIO24
    step_pins = [4, 17, 23, 24]

    for pin in step_pins:
        print('Setting up pin {0} as output...'.format(pin))
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, False)

    seq = [[1, 0, 0, 1],
           [1, 1, 0, 0],
           [0, 1, 1, 0],
           [0, 0, 1, 1]]

    step_count = len(seq)

    # increment of 1 is for clockwise spinning
    spin_clockwise = 1

    # Read wait time from command line
    min_wait_time = 17

    wait_time = 100
    accelerate_factor = 3
    factor_cntr = 0

    # Setup counter of steps
    total_steps_cnt = random_steps()

    # Initialise variables
    step_counter = 0

    print("total_steps_cnt value is: " + str(total_steps_cnt))
    # Start main loop
    for itr in range(0, total_steps_cnt):

        #print step_counter,
        #print Seq[step_counter]

        for pin in range(0, 4):
            xpin = step_pins[pin]  # Get GPIO
            if seq[step_counter][pin] != 0:
                #print " Enable GPIO %i" % xpin
                GPIO.output(xpin, True)
            else:
                GPIO.output(xpin, False)

        step_counter += spin_clockwise

        # If we reach the end of the sequence
        # start again
        if step_counter >= step_count:
            step_counter = 0
        if step_counter < 0:
            step_counter = step_count + spin_clockwise

        # Wait before moving on
        time.sleep(wait_time/float(10000))
        if wait_time > min_wait_time:
            if factor_cntr > accelerate_factor:
                factor_cntr = 0
                wait_time = wait_time - 1
            else:
                factor_cntr = factor_cntr + 1

    GPIO.cleanup()
    print "Reset pins at the end of work"
