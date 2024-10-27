from deporeibar.addon.testing import DEPOREIBAR_ADDON_ACCEPTANCE_TESTING
from deporeibar.addon.testing import DEPOREIBAR_ADDON_FUNCTIONAL_TESTING
from deporeibar.addon.testing import DEPOREIBAR_ADDON_INTEGRATION_TESTING
from pytest_plone import fixtures_factory


pytest_plugins = ["pytest_plone"]


globals().update(
    fixtures_factory(
        (
            (DEPOREIBAR_ADDON_ACCEPTANCE_TESTING, "acceptance"),
            (DEPOREIBAR_ADDON_FUNCTIONAL_TESTING, "functional"),
            (DEPOREIBAR_ADDON_INTEGRATION_TESTING, "integration"),
        )
    )
)
