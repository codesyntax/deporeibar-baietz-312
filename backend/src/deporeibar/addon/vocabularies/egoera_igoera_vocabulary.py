# from plone import api
from deporeibar.addon import _
from plone import api
from plone.dexterity.interfaces import IDexterityContent
from zope.globalrequest import getRequest
from zope.interface import implementer
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


class VocabItem:
    def __init__(self, token, value):
        self.token = token
        self.value = value


@implementer(IVocabularyFactory)
class EgoeraIgoeraVocabulary:
    """ """

    def __call__(self, context):
        # Just an example list of content for our vocabulary,
        # this can be any static or dynamic data, a catalog result for example.
        items = [
            VocabItem("zain", _("Zain")),
            VocabItem("egin-gabe", _("Egin gabe")),
            VocabItem("eginda-baliogabe", _("Eginda balio gabe")),
            VocabItem("eginda", _("Eginda")),
            VocabItem("bertan-behera", _("Bertan behera utzita")),
            VocabItem("proposatutakoa", _("Proposatutakoa")),
            VocabItem("proposatutakoa-eginda", _("Proposatutakoa eginda")),
        ]

        # create a list of SimpleTerm items:
        terms = []
        for item in items:
            terms.append(
                SimpleTerm(
                    value=item.token,
                    token=str(item.token),
                    title=item.value,
                )
            )
        # Create a SimpleVocabulary from the terms list and return it:
        return SimpleVocabulary(terms)


EgoeraIgoeraVocabularyFactory = EgoeraIgoeraVocabulary()
