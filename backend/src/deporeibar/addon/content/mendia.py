# -*- coding: utf-8 -*-
# from plone.app.textfield import RichText
# from plone.autoform import directives
from plone.dexterity.content import Container
# from plone.namedfile import field as namedfile
from plone.supermodel import model
# from plone.supermodel.directives import fieldset
# from z3c.form.browser.radio import RadioFieldWidget
from zope import schema
from zope.interface import implementer
from plone.app.dexterity.textindexer import searchable
from plone.schema.jsonfield import JSONField

from deporeibar.addon import _

class IMendia(model.Schema):
    """ Marker interface and Dexterity Python Schema for Mendia
    """
    # If you want, you can load a xml model created TTW here
    # and customize it in Python:
    searchable("altuera")
    altuera = schema.Int(
        title=_(
            u'Altuera',
        ),
        description=_(
            u'',
        ),
        required=False,
        default=0,
        # defaultFactory=get_default_name,
    )

    lat = schema.TextLine(
        title=_(
            u'Latitudea',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=True,
        readonly=False,
    )

    lon = schema.TextLine(
        title=_(
            u'Longitudea',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=True,
        readonly=False,
    )
    searchable("beste_izenak")
    beste_izenak = schema.Text(
        title=_(
            u'Beste izenak',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=False,
        readonly=False,
    )
    searchable("mendizerra")
    mendizerra = schema.TextLine(
        title=_(
            u'Mendizerra',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=False,
        readonly=False,
    )
    searchable("sektorea")
    sektorea = schema.TextLine(
        title=_(
            u'Sektorea',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=False,
        readonly=False,
    )

    zailtasuna = schema.Int(
        title=_(
            u'Zailtasuna',
        ),
        description=_(
            u'',
        ),
        required=False,
        default=1,
    )

    osm_kodea = schema.TextLine(
        title=_(
            'OSM kodea',
        ),
        description=_(
            '',
        ),
        default=u'',
        required=False,
        readonly=False,
    )

    egoera = schema.TextLine(
        title=_(
            u'Egoera',
        ),
        description=_(
            u'',
        ),
        required=False,
        readonly=True,
    )

@implementer(IMendia)
class Mendia(Container):
    """ Content-type class for IMendia
    """

    @property
    def egoera(self):
        from deporeibar.addon.indexers.egoera_indexer import egoera_indexer

        return egoera_indexer(self)()
