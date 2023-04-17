FROM node:16
WORKDIR /home/fc
COPY package*.json ./
RUN npm install
COPY build ./build
COPY config ./config
# 容器对外暴露的端口号
EXPOSE 8090
# 容器启动时执行的命令，类似npm run start
CMD ["npm", "start"]
