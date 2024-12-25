#!/bin/bash

echo "Updating github..."

git fetch
git checkout
git pull

# Frontend
echo "Mise à jour du frontend..."

cd frontend || echo "Le dossier 'frontend' n'existe pas. (wtf?)"
npm install

npm run build

# Backend

echo "Mise à jour du backend..."

cd ../api || echo "Le dossier 'api' n'existe pas. (wtf?)"
npm install

# Update database schemas (prisma)
npm run db

cd ..

echo "Redémarrage des services..."

systemctl --user restart 24hman_front.service
systemctl --user restart 24hman_api.service
