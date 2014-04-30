# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

import time

from marionette.by import By
from gaiatest import GaiaTestCase
from gaiatest.apps.settings.app import Settings

class TestSettingsWifi(GaiaTestCase):

    _wifi_enabled_label_locator = (By.CSS_SELECTOR, '#wifi-enabled label')

    def setUp(self):
        GaiaTestCase.setUp(self)

    def test_enable_disable(self):
        settings = Settings(self.marionette)
        settings.launch()
        wifi_settings = settings.open_wifi_settings()

        while True:
            self.toggle_wifi()
            time.sleep(1)

    def toggle_wifi(self):
        self.marionette.find_element(*self._wifi_enabled_label_locator).tap()