# -*- coding: utf-8 -*-

from deporeibar.addon.content.mendia import IMendia
from deporeibar.addon.content.igoera import IIgoera
from plone.dexterity.interfaces import IDexterityContent
from plone.indexer import indexer

import random


@indexer(IDexterityContent)
def dummy(obj):
    """Dummy to prevent indexing other objects thru acquisition"""
    raise AttributeError("This field should not indexed here!")


@indexer(IMendia)  # ADJUST THIS!
def egoera_indexer(obj):
    """Calculate and return the value for the indexer"""
    egoerak = [item.egoera for item in obj.values() if item.portal_type == "Igoera"]
    if "eginda" in egoerak:
        return "eginda"
    elif "zain" in egoerak:
        return "zain"
    elif "proposatutakoa" in egoerak:
        return "proposatutakoa"
    elif "proposatutakoa-eginda" in egoerak:
        return "proposatutakoa-eginda"

    return "egin-gabe"


@indexer(IIgoera)  # ADJUST THIS!
def egoera_indexer_igoera(obj):
    """Calculate and return the value for the indexer"""
    # XXX
    return obj.egoera
