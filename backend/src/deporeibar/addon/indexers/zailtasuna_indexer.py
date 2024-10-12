from deporeibar.addon.content.mendia import IMendia
from plone.dexterity.interfaces import IDexterityContent
from plone.indexer import indexer


@indexer(IDexterityContent)
def dummy(obj):
    """Dummy to prevent indexing other objects thru acquisition"""
    raise AttributeError("This field should not indexed here!")


@indexer(IMendia)  # ADJUST THIS!
def zailtasuna_indexer(obj):
    """Calculate and return the value for the indexer"""
    return str(obj.zailtasuna)
