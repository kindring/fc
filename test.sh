#!/bin/sh
if [ ! -f "./configs/Server.json" ];
then
  cp ./conf/Server.json ./configs/Server.json
  echo "Server.json copied from /conf to /configs"
fi
if [ ! -f "./configs/file.json" ];
then
  cp ./conf/file.json ./configs/file.json
  echo "file.json copied from /conf to /configs"
fi
if [ ! -f "./configs/Custom.json" ];
then
  cp ./conf/Custom.json ./configs/Custom.json
  echo "file.json copied from /conf to /configs"
fi
