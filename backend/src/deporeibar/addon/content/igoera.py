# -*- coding: utf-8 -*-
from Acquisition import aq_parent
# from plone.app.textfield import RichText
# from plone.autoform import directives
from plone.dexterity.content import Container
# from plone.namedfile import field as namedfile
from plone.supermodel import model
# from plone.supermodel.directives import fieldset
# from z3c.form.browser.radio import RadioFieldWidget
from zope import schema
from zope.interface import implementer
from plone import api

from deporeibar.addon import _


class IIgoera(model.Schema):
    """ Marker interface and Dexterity Python Schema for Igoera
    """
    eguna = schema.Date(
        title=_(
            u'Eguna',
        ),
        description=_(
            u'',
        ),
        # defaultFactory=get_default_,
        required=True,
        readonly=False,
    )

    oharrak = schema.Text(
        title=_(
            u'Oharrak',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=False,
        readonly=False,
    )

    egoera = schema.Choice(
        title=_(
            "Egoera",
        ),
        description=_(
            "",
        ),
        vocabulary="deporeibar.addon.EgoeraIgoeraVocabulary",
        default="zain",
        # defaultFactory=get_default_egoera,
        required=True,
        readonly=False,
    )

    egindako_eguna = schema.Date(
        title=_(
            "Igoera egin zen eguna",
        ),
        description=_(
            "",
        ),
        # defaultFactory=get_default_,
        required=False,
        readonly=False,
    )

    mendizaleak = schema.Text(
        title=_(
            u'Mendia igo zuten pertsonak',
        ),
        description=_(
            u'Idatzi bat lerro bakoitzean',
        ),
        required=False,
        readonly=False,
    )

    mendia_igo_duena = schema.TextLine(
        title=_(
            u'Agendaren bistan agertuko den izena',
        ),
        description=_(
            u'',
        ),
        default=u'',
        required=False,
        readonly=False,
    )


@implementer(IIgoera)
class Igoera(Container):
    """ Content-type class for IIgoera
    """

    def igoera_mendia_izena(self):
        return aq_parent(self).title

    def erreserba_egilea(self):
        return api.user.get(userid=self.Creator()).getProperty('fullname')
