#!/usr/bin/env bash
npm install mongodb
npm install mongoose
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
chmod a+x mongod