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
> Sinon Prisma ne peut pas avoir créé les tables et relations.

#### Solution 1 : Depuis le terminal

Ouvrez un terminal dans la route du projet, et exécutez :

```shell
cd assets/parser
node parserDataMap.js
cd ..
```

_Ce script génère les données pour la carte._

Puis, pour envoyer toutes les données à MariaDB :

_Toujours dans le dossier `assets`_

```shell
mysql -u <user> -p <database> < ./database.sql
mysql -u <user> -p <database> < ./shapesMap.sql
mysql -u <user> -p <database> < ./pointsMap.sql
```

Vous avez maintenant une API prête à fonctionner.

---

## Ressources

Script SQL: `assets/database.sql`

---

## Systèmes/librairies développées

Les différentes librairies et petits modules développés spécifiquement pour ce projet sont présentés dans cette
rubrique.

### 1. Aegis - Gestion des permissions

Le système de **permissions** a été sans aucun doute un des systèmes les plus complexes à mettre en place.

Le défi a été de se dire "La route d'accès aux items est autorisé, mais la même route en POST" n'est accessible qu'au
prestataire propriétaire de la boutique" et aucune solution _simple_ ne semblait convenir à nos besoins.

Nous avons alors entrepris de développer un système adapté pour nos besoins.
Nous allons vous présenter **comment** ce système a été imaginé et conçu.

### 1.1 Conception

Le système repose sur un principe simple.
Prenons la route suivante :

```
/boutique/porsche/items/porte-cle-porsche/
```

Nous pouvons découper cette route en liste de mots :

```js
["boutique", "porsche", "items", "porte-cle-porsche"]
```

Mais si on peut appliquer ce système à l'URL de la requête, on peut aussi avec la route de définition :

```js
["boutique", ":shop_id", "items", ":item_id"]
```

On peut alors définir un système de **règles** où nous pouvons vérifier la correspondance entre plusieurs URL :

```
    Match:
boutique  porsche   items  porte-cle-porshe
boutique  :shop_id  items  :item_id

    Ne match pas:
boutique  porsche   items  porte-cle-porsche
boutique  :shop_id  items
```

Une fois cela fait, nos règles peuvent suivre un ensemble de définitions, tel :

1. **Les méthodes :** Cela permet de définir un ensemble de règles pour une même route, mais avec des permissions
   différentes selon la ou les méthode(s).
2. **Les permissions :** Cela va de soi, il faut définir quels types d'utilisateurs ont accès à une route ou si l'accès
   est autorisé/interdit.
3. **Le `scope` de la règle :** Un peu plus complexe.
   Cela permet de dire que certaines règles sont appliquées aux
   routes des prestataires, d'autres aux routes utilisateurs ou administrateurs.

Pour illustrer ces fonctionnalités, voici un exemple d'utilisation :

```js
app.get("/hello/:name/presta", prestataireMiddleware, function (req, res) {
    res.send(`Hello prestataire ${req.params.name}`);
});
// Sera accessible au middleware des prestataires uniquement
createRule("/hello/:name/presta", Method.All, User.Prestataire, [Permission.Prestataire, Permission.Admin]);
// Cette règle ne sera quand à elle accessible qu'au middleware des utilisateurs
createRule("/hello/:name", Method.GET, User.None, [Permission.Public]);
```

---
