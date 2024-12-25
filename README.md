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
```

_Le port `4629` est recommandé pour le développement, car c'est celui-ci qui est utilisé dans Swagger_

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