from email.headerregistry import Address
from email.message import EmailMessage
from plone import api
from plone.registry.interfaces import IRegistry
from Products.CMFPlone.interfaces.controlpanel import IMailSchema
from zope.component import getUtility


def send_email(msg_subject, msg_to, msg_body, immediate=False, attachments=[]):
    """send email"""
    pt = api.portal.get_tool("portal_transforms")
    msg_body_text = pt.convertTo("text/plain", msg_body, mimetype="text/html")

    registry = getUtility(IRegistry)
    mail_settings = registry.forInterface(IMailSchema, prefix="plone")

    msg = EmailMessage()
    msg["Subject"] = msg_subject
    msg["From"] = Address(
        mail_settings.email_from_address,
        addr_spec=mail_settings.email_from_address,
    )
    msg["To"] = Address(msg_to, addr_spec=msg_to)
    msg.set_content(msg_body_text.getData())
    msg.add_alternative(msg_body, subtype="html")

    for attachment in attachments:
        msg.add_attachment(
            attachment.get("data").encode("utf-8"),
            maintype=attachment.get("mime_type").split("/")[0],
            subtype=attachment.get("mime_type").split("/")[1],
            filename="fitxategia.csv",
        )

    mailhost = api.portal.get_tool("MailHost")
    from logging import getLogger

    log = getLogger(__name__)

    try:
        mailhost.send(msg, charset="utf-8", immediate=immediate)
        log.info(
            f"Eposta mezua ondo bidalita. Gaia: {msg_subject}:"
            f" {mail_settings.email_from_address} -> {msg_to}"
        )
        return True
    except Exception as e:
        log.exception(e)
        log.info(
            f"Eposta mezua EZ DA BIDALI. Gaia: {msg_subject}:"
            f" {mail_settings.email_from_address} -> {msg_to}"
        )
        return False
