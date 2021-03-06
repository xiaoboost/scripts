# @scripts/e-hentai

自己用的绅士辅助工具

## 安装

[greasyfork](https://greasyfork.org/scripts/438541)

## 使用

### 列表

批量种子下载暂时只支持缩略图模式，在列表页的画廊缩略图底部右侧会出现复选框，整个列表的右下角会出现`Download Selected`按钮，点击按钮即会顺序下载勾选的画廊。

![画廊的待选框](./document/gallery-checkbox.jpg)

![下载列表右下角的下载按钮](./document/download-galleries-button.jpg)

### 画廊

在每个画廊右侧的按钮区域，会多出`Download Gallery`的按钮，点击即可呼出下载面板。

![画廊中的下载按钮](./document/download-gallery-button.jpg)

### 注意

在初次下载中会出现`脚本试图访问跨源资源`的许可弹窗，选择`总是允许该域`即可。

## 路线图

- [ ] 画廊
  - [x] 基础下载
  - [x] 范围选择
  - [ ] 错误重试
  - [x] 509 错误警告
- [ ] 列表
  - [ ] 批量下载画廊种子
    - [x] 缩略图模式
    - [ ] 非缩略图模式

## 调试

1. 运行命令 `npm run watch`
2. 打开 Tampermonkey 的`实用工具`页面
3. 在最下方的`从 URL 安装`选项中填入网址`http://localhost:5555/index.js`，然后点击右侧安装即可

注：

油猴并不会自动从 URL 拿到最新的代码，所以每次更新代码都需要手动在油猴重新安装。
