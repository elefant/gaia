# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

import time

from marionette.by import By
from gaiatest import GaiaTestCase
from gaiatest.apps.settings.app import Settings

class TestSettingsAirplaneToggle(GaiaTestCase):

    _airplane_switch_locator = (By.XPATH, "//input[@id='airplaneMode-input']/..")

    def setUp(self):
        GaiaTestCase.setUp(self)

    def test_toggle_airplane(self):
        settings = Settings(self.marionette)
        settings.launch()

        while True:
            self.toggle_airplane()
            time.sleep(1)

    def toggle_airplane(self):
        self.marionette.find_element(*self._airplane_switch_locator).tap()