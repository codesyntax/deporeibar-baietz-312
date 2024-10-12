# -*- coding: utf-8 -*-
from plone import api
from plone.restapi.deserializer import json_body
from plone.restapi.interfaces import ISerializeToJson
from plone.restapi.services import Service
from zope.component import queryMultiAdapter
from plone.protect.interfaces import IDisableCSRFProtection
from zope.interface import alsoProvides

from datetime import datetime
from datetime import timedelta

def to_datetime(string):
    return datetime.strptime(string, '%Y-%m-%d').date()

class AddIgoeraPost(Service):

    def reply(self):
        alsoProvides(self.request, IDisableCSRFProtection)
        body = json_body(self.request)
        user = api.user.get_current()
        date = to_datetime(body.get('eguna'))

        if date <= datetime.now().date():
            self.request.response.setStatus(400)
            return {
                'msg': 'Erreserbak etorkizunerako bakarrik egin ditzakezu!'
            }

        if date > datetime.now().date() + timedelta(days=30):
            self.request.response.setStatus(400)
            return {
                'msg': 'Ezin duzu hemendik 30 egun baino gehiagorako erreserbarik egin!'
            }


        with api.env.adopt_roles(['Manager']):
            content = api.content.create(
                 container=self.context,
                type="Igoera",
                title=body.get('title'),
                eguna=date,
                oharrak=body.get('oharrak'),
                egoera=body.get('egoera')
            )

            content.setCreators(user.getId())
            content.changeOwnership(user)

            api.content.transition(obj=content, transition='publish')

        self.request.response.setStatus(201)
        self.request.response.setHeader("Location", content.absolute_url())

        serializer = queryMultiAdapter((content, self.request), ISerializeToJson)
        serialized_obj = serializer()
        serialized_obj["@id"] = content.absolute_url()

        return serialized_obj
