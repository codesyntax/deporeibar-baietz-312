# Baietz 312 🚀

[![Built with Cookieplone](https://img.shields.io/badge/built%20with-Cookieplone-0083be.svg?logo=cookiecutter)](https://github.com/plone/cookiecutter-plone/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
[![Backend Tests](https://github.com/codesyntax/deporeibar-baietz-312/actions/workflows/backend.yml/badge.svg)](https://github.com/codesyntax/deporeibar-baietz-312/actions/workflows/backend.yml)
[![Frontend Tests](https://github.com/codesyntax/deporeibar-baietz-312/actions/workflows/frontend.yml/badge.svg)](https://github.com/codesyntax/deporeibar-baietz-312/actions/workflows/frontend.yml)

Eibarko Klub Deportiboaren Baietz 312 proiektuaren webgunea

## Quick Start 🏁

### Prerequisites ✅

Ensure you have the following installed:

- Python 3.11 🐍
- Node 20 🟩
- pnpm 🧶
- Docker 🐳

### Installation 🔧

1. Clone the repository:

```shell
git clone git@github.com:codesyntax/deporeibar-baietz-312.git
cd deporeibar-baietz-312
```

2. Install both Backend and Frontend:

```shell
make install
```

### Fire Up the Servers 🔥

1. Create a new Plone site on your first run:

```shell
make backend-create-site
```

2. Start the Backend at [http://localhost:8080/](http://localhost:8080/):

```shell
make backend-start
```

3. In a new terminal, start the Frontend at [http://localhost:3000/](http://localhost:3000/):

```shell
make frontend-start
```

Voila! Your Plone site should be live and kicking! 🎉

### Local Stack Deployment 📦

Deploy a local `Docker Compose` environment that includes:

- Docker images for Backend and Frontend 🖼️
- A stack with a Traefik router and a Postgres database 🗃️
- Accessible at [http://deporeibar-baietz-312.localhost](http://deporeibar-baietz-312.localhost) 🌐

Execute the following:

```shell
make stack-start
make stack-create-site
```

And... you're all set! Your Plone site is up and running locally! 🚀

## Project Structure 🏗️

This monorepo consists of three distinct sections: `backend`, `frontend`, and `devops`.

- **backend**: Houses the API and Plone installation, utilizing pip instead of buildout, and includes a policy package named deporeibar.addon.
- **frontend**: Contains the React (Volto) package.
- **devops**: Encompasses Docker Stack, Ansible playbooks, and Cache settings.

### Why This Structure? 🤔

- All necessary codebases to run the site are contained within the repo (excluding existing addons for Plone and React).
- Specific GitHub Workflows are triggered based on changes in each codebase (refer to .github/workflows).
- Simplifies the creation of Docker images for each codebase.
- Demonstrates Plone installation/setup without buildout.

## Code Quality Assurance 🧐

To automatically format your code and ensure it adheres to quality standards, execute:

```shell
make check
```

Linters can be run individually within the `backend` or `frontend` folders.

## Internationalization 🌐

Generate translation files for Plone and Volto with ease:

```shell
make i18n
```

## Credits and Acknowledgements 🙏

Crafted with care by **Generated using [Cookieplone (0.7.1)](https://github.com/plone/cookieplone) and [cookiecutter-plone (6bb9207)](https://github.com/plone/cookiecutter-plone/commit/6bb920717715b66a0f432f2d7eafb523da9543bd) on 2024-10-12 08:22:47.414108**. A special thanks to all contributors and supporters!
