from deporeibar.addon.content.igoera import IIgoera  # NOQA E501
from deporeibar.addon.testing import DEPOREIBAR_ADDON_INTEGRATION_TESTING  # noqa
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject
from zope.component import queryUtility

import unittest


class IgoeraIntegrationTest(unittest.TestCase):
    layer = DEPOREIBAR_ADDON_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_igoera_schema(self):
        fti = queryUtility(IDexterityFTI, name="Igoera")
        schema = fti.lookupSchema()
        self.assertEqual(IIgoera, schema)

    def test_ct_igoera_fti(self):
        fti = queryUtility(IDexterityFTI, name="Igoera")
        self.assertTrue(fti)

    def test_ct_igoera_factory(self):
        fti = queryUtility(IDexterityFTI, name="Igoera")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IIgoera.providedBy(obj),
            "IIgoera not provided by {}!".format(
                obj,
            ),
        )

    def test_ct_igoera_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="Igoera",
            id="igoera",
        )

        self.assertTrue(
            IIgoera.providedBy(obj),
            "IIgoera not provided by {}!".format(
                obj.id,
            ),
        )

        parent = obj.__parent__
        self.assertIn("igoera", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("igoera", parent.objectIds())

    def test_ct_igoera_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Igoera")
        self.assertTrue(fti.global_allow, f"{fti.id} is not globally addable!")

    def test_ct_igoera_filter_content_type_false(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Igoera")
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            "igoera_id",
            title="Igoera container",
        )
        self.parent = self.portal[parent_id]
        obj = api.content.create(
            container=self.parent,
            type="Document",
            title="My Content",
        )
        self.assertTrue(obj, f"Cannot add {obj.id} to {fti.id} container!")
