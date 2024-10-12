from Acquisition import aq_parent
from chameleon.zpt.template import PageTemplateFile
from deporeibar.addon.utils import send_email
from plone import api
from zope.site.hooks import setSite

import datetime
import os


def get_message_body(item):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    template = PageTemplateFile(f"{current_dir}/warning_5_days.pt")
    msg_body = template(igoera=item, mendia=aq_parent(item))
    return msg_body


def notify_items(items):
    for item in items:
        mountain = aq_parent(item)
        user = api.user.get(userid=item.creators[0])
        subject = f"Baietz 312 mendi! {mountain.Title()}"
        to = user.getProperty("email")
        msg_body = get_message_body(item)
        send_email(subject, to, msg_body, immediate=True)


def main(app, *args):
    setSite(app.Plone)

    brains = api.content.find(portal_type="Igoera")

    today = datetime.datetime.now().date()

    items_to_notify = []

    print("5 eguneko kontrola: %s", today.isoformat())

    for brain in brains:
        item = brain.getObject()
        if item.egoera == "zain":
            if today - item.eguna == datetime.timedelta(days=5):
                print(item.Title())
                print(f"Gaur: {today}")
                print(f"Eguna: {item.eguna}")
                print(f"Diff: {today - item.eguna}")
                print(f"Notify: {item.title}")
                items_to_notify.append(item)
            print("-----------------------------------")

    notify_items(items_to_notify)
    print("Kontrola eginda: %s", today.isoformat())
