# 24h du Mans

Site: https://24h.chamallow.fr<br>
API:  https://api.24h.chamallow.fr

***

## Sujet

Cette application web full-stack a été développée dans le cadre d'un projet universitaire par Cédric COLIN, Sugdenaz
EKICI, Anna GAIFFE, Marvyn LEVIN, Leslie MERAT.
Elle permet de gérer les prestataires, les organisateurs et les
visiteurs d'un événement majeur comme les 24h du Mans.
L'application propose des fonctionnalités interactives, telles
qu'une carte interactive des emplacements, des statistiques sur l'affluence, et la gestion des services pour chaque
prestataire.

## Variables d'environnement

Structure du fichier `api/.env`:

```dotenv
API_PORT=4629
PROD=false# Ou 'true' en production, mais c'est évident

# Utilisé par l'ORM 'Prisma'
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

MAIL_ADDRESS="<EMAIL>"
MAIL_PASSWORD="<MOT_DE_PASSE_SPECIAL>"

SECRET="<SECRET_POUR_LES_TOKENS>"
```

Structure du fichier `frontend/.env`:

```dotenv
VUE_APP_AXIOS_BASE_URL="http://localhost:4629" # Ou "https://api.24h.chamallow.fr" pour utiliser la production
```

_Le port `4629` est recommandé pour le développement, car c'est celui-ci qui est utilisé dans Swagger_

## Installation

Afin d'installer et mettre en place le projet, suivez les étapes suivantes :

**Télécharger le dépôt :**

```shell
git clone https://github.com/lynn2910/24hmans.git
```

Vous pouvez naviguer vers le dossier `24hmans` créé.

### Mettre en place le frontend

```shell
cd frontend && npm i
```

### Mettre en place l'API

> ⚠️ Vous devez avoir une base de donnée **MariaDB** avec une base de donnée fonctionnelle et un accès (login +
> password)

```shell
cd frontend && npm i
```

Une fois les paquets installés, vous allez devoir configurer **Prisma** (ORM) afin de générer les schémas.

*Toujours dans le dossier `api`*

Créez un fichier `.env` suivant la structure définie au-dessus et remplissez les valeurs de `DATABASE_URL`.

```shell
npm i @prisma/client && npx run db
```

_Si vous obtenez des erreurs, suivez les instructions ci-dessous_

Une fois le script exécuté, l'API sera alors prête.
Vous pouvez la lancer avec la commande suivante :

```shell
npm run api
```

### Si Prisma a échoué

1. Vérifiez que votre version de **NodeJS** est assez **récente**
2. Mettez à jour votre système

Si l'erreur est qu'une ou plusieurs tables sont corrompues, cela signifie que vous devez mettre à jour MariaDB, ou
exécuter le script de mises à jour de MariaDB.

Tentez :

```shell
mysql_upgrade -u <user> -p
```

Et réessayez.
Si l'erreur ne disparaît pas, vous avez une version obsolète de MariaDB et devez mettre à jour le serveur (ex. avec
_apt_ sur Linux).

> **Si vous n'arrivez pas à faire fonctionner l'API ou ne voulez/ne pouvez pas mettre à jour MariaDB :**
>
> Nous avons déployé le frontend et l'API respectivement aux adresses suivantes :
> - [24h.chamallow.fr](https://24h.chamallow.fr)
> - [api.24h.chamallow.fr](https://api.24h.chamallow.fr)
>
> Documentation Swagger:
> - [Swagger - api.24h.chamallow.fr](https://api.24h.chamallow.fr/api-docs)

### Ajouter les jeux de tests

> ⚠️ Vous devez avoir lancé l'API ou le script `db` au moins une fois.
> Sinon Prisma ne peut pas avoir créé les tables et relations (synchronisation des tables).

#### Solution 1 : Depuis le terminal

Ouvrez un terminal dans la route du projet, et exécutez :

```shell
cd api/prisma
```

Puis:

```shell
mysql -u <user> -p <database> < ./fullData.sql
```

Vous avez maintenant une API prête à fonctionner.

---

## Ressources

Script SQL: `assets/fullData.sql`

---