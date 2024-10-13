from deporeibar.addon.content.mendia import IMendia
from plone.dexterity.interfaces import IDexterityContent
from plone.indexer import indexer


@indexer(IDexterityContent)
def dummy(obj):
    """Dummy to prevent indexing other objects thru acquisition"""
    raise AttributeError("This field should not indexed here!")


@indexer(IMendia)  # ADJUST THIS!
def altuera_indexer(obj):
    """Calculate and return the value for the indexer"""
    return f"{obj.altuera:>04}"


@indexer(IMendia)  # ADJUST THIS!
def altuera_indexer_int(obj):
    """Calculate and return the value for the indexer"""
    return obj.altuera
