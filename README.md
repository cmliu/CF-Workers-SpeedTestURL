# SpeedTest-CloudflareWorker

## 一、项目简介

本项目是一个使用Cloudflare的Worker搭建SpeedTest测速地址的工程，主要代码在`_worker.js`文件中。通过本项目，你可以很容易地在Cloudflare上搭建起自己的测速服务。

## 二、功能介绍

例如您的项目域名为 `speedtest.cmliussss.workers.dev`

1. **默认测速大小为200MB**：当未在路径中指定测速大小时，项目会默认进行200MB的测速。

- 200M   默认测试下载地址: `https://speedtest.cmliussss.workers.dev`
 

2. **自定义测速大小**：通过在路径中指定数字和单位（可选的单位包括 K，M，G），可以设定想要进行测速的数据大小，如“/500M”表示进行500MB的测速。

- 1024K  测试下载地址: `https://speedtest.cmliussss.workers.dev/1024k`
- 200M   测试下载地址: `https://speedtest.cmliussss.workers.dev/200m`
- 1G     测试下载地址: `https://speedtest.cmliussss.workers.dev/1g`

3. **推荐使用workers部署方案并绑定自定义域，即可同时具备 http/https 两种测速途径。**

## 三、使用指南

1. 克隆或下载本项目到你的本地设备。

2. 在Cloudflare的Worker中创建一个新的项目，并将`worker.js`文件中的代码复制粘贴到你的项目中。

3. 部署你的Worker项目。

现在，你可以访问你的Worker的URL，进行网速测试了。

## 四、注意事项

- 代码中的路径需要做适当修改，以反映你自己的Cloudflare Worker的URL。
- 当路径不符合预设的格式时，程序将返回400错误。

希望这个星级的项目能对你有所帮助，如果你喜欢或用到了本项目，希望能给我一个星级鼓励一下。
