#!/bin/sh
if [ ! -f "./config/Server.json" ];
then
  cp ./conf/Server.json ./config/Server.json
  echo "Server.json copied from /conf to /config"
fi
if [ ! -f "./config/file.json" ];
then
  cp ./conf/file.json ./config/file.json
  echo "file.json copied from /conf to /config"
fi
if [ ! -f "./config/Custom.json" ];
then
  cp ./conf/Custom.json ./config/Custom.json
  echo "file.json copied from /conf to /config"
fi

npm run start
