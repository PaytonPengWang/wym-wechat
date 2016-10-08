#!/bin/bash

echo "~~正在初始化编译环境"
cnpm install
echo "~~正在编译源代码"
gulp init
cd www
echo "~~正在初始化运行环境"
cnpm install
cd ../
echo "~~停止Docker服务"
docker stop wechat_server
echo "~~删除Docker服务"
docker rm wechat_server
echo "~~删除Docker镜像"
docker rmi wym/wechat_server:1.0
echo "~~重新构建Docker镜像"
docker build -t="wym/wechat_server:1.0" .
echo "~~运行服务"
docker run --name wechat_server -p 7004:7004 wym/wechat_server:1.0
