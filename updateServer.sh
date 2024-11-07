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

cd ..

echo "Redémarrage des services..."

systemctl --user restart 24h_man_front.service
systemctl --user restart 24h_man_api.service
