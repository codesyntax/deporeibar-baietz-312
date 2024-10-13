from Acquisition import aq_parent
from plone.restapi.deserializer import json_body
from plone.restapi.services import Service
from zope.event import notify
from zope.lifecycleevent import ObjectModifiedEvent


class ModifyIgoeraPatch(Service):
    def reply(self):
        body = json_body(self.request)
        egoera = body.get("egoera")
        self.context.egoera = egoera

        mendia = aq_parent(self.context)
        mendia.reindexObject()

        self.context.reindexObject()

        notify(ObjectModifiedEvent(self.context))

        return self.reply_no_content()
