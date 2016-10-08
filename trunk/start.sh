#!/bin/bash

echo "~~正在初始化编译环境"
cnpm install
echo "~~正在编译源代码"
gulp init
cd www
echo "~~正在初始化运行环境"
cnpm install
forever stop app.js
forever start app.js
