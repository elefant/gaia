#!/bin/bash

source .venv/bin/activate

while true
do
    adb forward tcp:2828 tcp:2828
    gaiatest --address=localhost:2828  --testvars=gaiatest/testvars_template.json gaiatest/tests/functional/settings/test_settings_wifi_enable.py
done

