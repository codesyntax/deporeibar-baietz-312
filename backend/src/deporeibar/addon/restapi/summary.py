from plone.restapi.interfaces import IJSONSummarySerializerMetadata
from zope.interface import implementer

@implementer(IJSONSummarySerializerMetadata)
class JSONSummarySerializerMetadata:

    def default_metadata_fields(self):
        """return a set with the metadata fields to be returned"""
        return {"mendizerra", "altuera", "sektorea", "zailtasuna", "egoera_mendia", "egoera_igoera", "lat", "lon", "erreserbak", "creators", "created", "eguna"}
