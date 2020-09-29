#!/bin/sh
set -e

curl https://raw.githubusercontent.com/Monsieur-Wary/group-expenses-back/master/docker-compose.yml -LsO
docker-compose down --remove-orphans -v
docker-compose pull && docker-compose up