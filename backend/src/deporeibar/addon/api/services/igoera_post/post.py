from plone import api
from plone.restapi.deserializer import json_body
from plone.restapi.interfaces import IExpandableElement
from plone.restapi.services import Service
from plone.restapi.services.content.add import FolderPost
from zope.component import adapter
from zope.interface import implementer
from zope.interface import Interface


class IgoeraPost(FolderPost):
    def reply(self):
        data = json_body(self.request)
        current_user = api.user.get_current()
        if (
            data["@type"] == "Image"
            and current_user.getId() == self.context.creators[0]
        ):
            return super().reply()

        self.request.response.setStatus(400)
        return dict(error=dict(type="Bad Request", message="Bad Request"))
