# from plone.app.textfield import RichText
# from plone.autoform import directives
from deporeibar.addon import _
from plone.app.dexterity.textindexer import searchable
from plone.dexterity.content import Container

# from plone.namedfile import field as namedfile
from plone.supermodel import model

# from plone.supermodel.directives import fieldset
# from z3c.form.browser.radio import RadioFieldWidget
from zope import schema
from zope.interface import implementer


class IMendia(model.Schema):
    """Marker interface and Dexterity Python Schema for Mendia"""

    # If you want, you can load a xml model created TTW here
    # and customize it in Python:
    searchable("altuera")
    altuera = schema.Int(
        title=_(
            "Altuera",
        ),
        description=_(
            "",
        ),
        required=False,
        default=0,
        # defaultFactory=get_default_name,
    )

    lat = schema.TextLine(
        title=_(
            "Latitudea",
        ),
        description=_(
            "",
        ),
        default="",
        required=True,
        readonly=False,
    )

    lon = schema.TextLine(
        title=_(
            "Longitudea",
        ),
        description=_(
            "",
        ),
        default="",
        required=True,
        readonly=False,
    )
    searchable("beste_izenak")
    beste_izenak = schema.Text(
        title=_(
            "Beste izenak",
        ),
        description=_(
            "",
        ),
        default="",
        required=False,
        readonly=False,
    )
    searchable("mendizerra")
    mendizerra = schema.TextLine(
        title=_(
            "Mendizerra",
        ),
        description=_(
            "",
        ),
        default="",
        required=False,
        readonly=False,
    )
    searchable("sektorea")
    sektorea = schema.TextLine(
        title=_(
            "Sektorea",
        ),
        description=_(
            "",
        ),
        default="",
        required=False,
        readonly=False,
    )

    zailtasuna = schema.Int(
        title=_(
            "Zailtasuna",
        ),
        description=_(
            "",
        ),
        required=False,
        default=1,
    )

    osm_kodea = schema.TextLine(
        title=_(
            "OSM kodea",
        ),
        description=_(
            "",
        ),
        default="",
        required=False,
        readonly=False,
    )

    egoera = schema.TextLine(
        title=_(
            "Egoera",
        ),
        description=_(
            "",
        ),
        required=False,
        readonly=True,
    )


@implementer(IMendia)
class Mendia(Container):
    """Content-type class for IMendia"""

    @property
    def egoera(self):
        from deporeibar.addon.indexers.egoera_indexer import egoera_indexer

        return egoera_indexer(self)()
