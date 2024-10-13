from deporeibar.addon.content.mendia import IMendia  # NOQA E501
from deporeibar.addon.testing import DEPOREIBAR_ADDON_INTEGRATION_TESTING  # noqa
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject
from zope.component import queryUtility

import unittest


class MendiaIntegrationTest(unittest.TestCase):
    layer = DEPOREIBAR_ADDON_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_mendia_schema(self):
        fti = queryUtility(IDexterityFTI, name="Mendia")
        schema = fti.lookupSchema()
        self.assertEqual(IMendia, schema)

    def test_ct_mendia_fti(self):
        fti = queryUtility(IDexterityFTI, name="Mendia")
        self.assertTrue(fti)

    def test_ct_mendia_factory(self):
        fti = queryUtility(IDexterityFTI, name="Mendia")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IMendia.providedBy(obj),
            "IMendia not provided by {}!".format(
                obj,
            ),
        )

    def test_ct_mendia_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="Mendia",
            id="mendia",
        )

        self.assertTrue(
            IMendia.providedBy(obj),
            "IMendia not provided by {}!".format(
                obj.id,
            ),
        )

        parent = obj.__parent__
        self.assertIn("mendia", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("mendia", parent.objectIds())

    def test_ct_mendia_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Mendia")
        self.assertTrue(fti.global_allow, f"{fti.id} is not globally addable!")

    def test_ct_mendia_filter_content_type_false(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="Mendia")
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            "mendia_id",
            title="Mendia container",
        )
        self.parent = self.portal[parent_id]
        obj = api.content.create(
            container=self.parent,
            type="Document",
            title="My Content",
        )
        self.assertTrue(obj, f"Cannot add {obj.id} to {fti.id} container!")
