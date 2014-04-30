#!/bin/bash

curl https://raw.github.com/pypa/virtualenv/49f40128a9ca3824ebf253eca408596e135cf893/virtualenv.py -L | python - --no-site-packages .venv
source .venv/bin/activate
python setup.py develop

while true
do
    adb forward tcp:2828 tcp:2828
    gaiatest --address=localhost:2828  --testvars=gaiatest/testvars_template.json gaiatest/tests/functional/settings/test_settings_wifi_enable.py
done

