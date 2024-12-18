# 24h du Mans

Site: https://24h.chamallow.fr<br>
API:  https://api.24h.chamallow.fr

***

## Sujet

Cette application web full-stack a été développée dans le cadre d'un projet universitaire par Cédric COLIN, Sugdenaz
EKICI, Anna GAIFFE, Marvyn Levin, Leslie Mérat. Elle permet de gérer les prestataires, les organisateurs et les
visiteurs d'un événement majeur comme les 24h du Mans. L'application propose des fonctionnalités interactives, telles
qu'une carte interactive des emplacements, des statistiques sur l'affluence, et la gestion des services pour chaque
prestataire.

## Variables d'environnement

Structure du fichier `api/.env`:

```dotenv
API_PORT=4629
PROD=false # Ou 'true' en production, mais c'est évident

# Utilisé par l'ORM
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

_Le port `4629` est recommandé pour le développement, car c'est celui-ci qui est utilisé dans Swagger_

## Ressources

Script SQL: `assets/database.sql`