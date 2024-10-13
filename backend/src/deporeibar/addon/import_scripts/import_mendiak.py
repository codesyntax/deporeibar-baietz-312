import csv
import requests


BASE = "http://localhost:8080/Plone/mendiak"
AUTH = ("admin", "admin")
HEADERS = {"Accept": "application/json"}


def get_text_values(item):
    text = []

    for k, v in item.items():
        if k.startswith("name:"):
            text.extend(v.split(";"))
        if k.startswith("alt_name:"):
            text.extend(v.split(";"))
        if k.startswith("official_name"):
            text.extend(v.split(";"))

    return "\n".join(text)


def get_mendia(item):
    try:
        return {
            "@type": "Mendia",
            "title": item["name"],
            "altuera": item["ele"] and int(float(item["ele"])) or 0,
            "lat": item["lat"],
            "lon": item["lon"],
            "mendizerra": item.get("MENDIZERRA", ""),
            "sektorea": item.get("SEKTOREA", ""),
            # XXX
            # "zailtasuna": item["ZAILTASUNA"],
            "zailtasuna": 1,
            "beste_izenak": get_text_values(item),
            "osm_kodea": item["id"],
        }
    except Exception as exc:
        print(exc)
        return {}


def import_mendia(item):
    mendia = get_mendia(item)
    if mendia:
        result = requests.post(BASE, json=mendia, headers=HEADERS, auth=AUTH, timeout=5)
        if result.ok:
            print(f'Created: {item["name"]}')
        else:
            print(f'Error: {item["name"]}')
    else:
        print(f'Skipped: {item["name"]}')


def import_mendiak(fitxategia):
    with open(fitxategia) as fp:
        dialect = csv.Sniffer().sniff(fp.read(1024))
        fp.seek(0)
        first = fp.readline()
        fieldnames = list(map(lambda x: x.replace('"', "").strip(), first.split(",")))
        fp.seek(0)

        reader = csv.DictReader(fp, fieldnames, dialect=dialect)
        for item in reader:
            import_mendia(item)


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Mendien CSV fitxategiak importatu")
    parser.add_argument(
        "fitxategiak",
        nargs="+",
    )

    args = parser.parse_args()
    for fitxategia in args.fitxategiak:
        import_mendiak(fitxategia)
