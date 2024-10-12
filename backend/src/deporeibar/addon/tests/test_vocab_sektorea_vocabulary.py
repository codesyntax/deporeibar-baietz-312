from deporeibar.addon import _
from deporeibar.addon.testing import DEPOREIBAR_ADDON_INTEGRATION_TESTING  # noqa
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from zope.component import getUtility
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.interfaces import IVocabularyTokenized

import unittest


class SektoreaVocabularyIntegrationTest(unittest.TestCase):
    layer = DEPOREIBAR_ADDON_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

    def test_vocab_sektorea_vocabulary(self):
        vocab_name = "deporeibar.addon.SektoreaVocabulary"
        factory = getUtility(IVocabularyFactory, vocab_name)
        self.assertTrue(IVocabularyFactory.providedBy(factory))

        vocabulary = factory(self.portal)
        self.assertTrue(IVocabularyTokenized.providedBy(vocabulary))
        self.assertEqual(
            vocabulary.getTerm("sony-a7r-iii").title,
            _("Sony Aplha 7R III"),
        )
