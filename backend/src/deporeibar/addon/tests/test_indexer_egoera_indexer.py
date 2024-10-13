from deporeibar.addon.testing import DEPOREIBAR_ADDON_FUNCTIONAL_TESTING
from deporeibar.addon.testing import DEPOREIBAR_ADDON_INTEGRATION_TESTING
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID

import unittest


class IndexerIntegrationTest(unittest.TestCase):
    layer = DEPOREIBAR_ADDON_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

    def test_dummy(self):
        self.assertTrue(True)


class IndexerFunctionalTest(unittest.TestCase):
    layer = DEPOREIBAR_ADDON_FUNCTIONAL_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

    def test_dummy(self):
        self.assertTrue(True)
