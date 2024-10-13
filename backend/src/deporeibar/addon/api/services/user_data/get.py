from plone.restapi.services import Service
from Products.CMFCore.utils import getToolByName
from zope.component.hooks import getSite


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
            return {"id": user.getId(), "fullname": user.getProperty("fullname")}

        users = map(decorate, users)
        return {user["id"]: user["fullname"] for user in users}

    def reply(self):
        return self._get_users()
