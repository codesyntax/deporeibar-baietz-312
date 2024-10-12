# -*- coding: utf-8 -*-
from plone import api
from plone.restapi.interfaces import IExpandableElement
from plone.restapi.services import Service
from zope.component import adapter
from zope.interface import Interface
from zope.interface import implementer
from AccessControl import getSecurityManager
from Acquisition import aq_inner
from itertools import chain
from plone.app.workflow.browser.sharing import merge_search_results
from plone.namedfile.browser import ALLOWED_INLINE_MIMETYPES
from plone.namedfile.browser import DISALLOWED_INLINE_MIMETYPES
from plone.namedfile.browser import USE_DENYLIST
from plone.namedfile.utils import stream_data
from plone.restapi.interfaces import ISerializeToJson
from plone.restapi.permissions import PloneManageUsers
from plone.restapi.services import Service
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone.utils import normalizeString
from Products.PlonePAS.tools.memberdata import MemberData
from Products.PlonePAS.tools.membership import default_portrait
from Products.PlonePAS.utils import decleanId
from typing import Iterable
from typing import Sequence
from urllib.parse import parse_qs
from urllib.parse import quote
from zExceptions import BadRequest
from zope.component import getMultiAdapter
from zope.component import queryMultiAdapter
from zope.component.hooks import getSite
from zope.interface import implementer
from zope.publisher.interfaces import IPublishTraverse


class UserDataGet(Service):

    def __init__(self, context, request):
        super().__init__(context, request)
        self.params = []
        portal = getSite()
        self.portal_membership = getToolByName(portal, "portal_membership")
        self.acl_users = getToolByName(portal, "acl_users")

    def _get_users(self, **kw):
        results = {user["userid"] for user in self.acl_users.searchUsers(**kw)}
        users = (self.portal_membership.getMemberById(userid) for userid in results)
        # Filtering for None which might happen due to some unknown condition
        users = filter(lambda x: x is not None, users)

        def decorate(user):
            return {'id': user.getId(), 'fullname': user.getProperty('fullname')}

        users = map(decorate, users)
        return {user['id']: user['fullname'] for user in users}

    def reply(self):
        return self._get_users()
