# zhihu-utils

自己用的知乎辅助工具

## 安装

[greasyfork](https://greasyfork.org/zh-CN/scripts/437940-zhihu-utils)

## 路线图

- [x] 隐藏侧边栏
  - [x] 主页
  - [x] 问题页面
  - [x] 搜索页面
- [ ] 隐藏图片
  - [ ] 回答
  - [ ] 专栏
- [ ] 屏蔽盐选内容
- [x] 专栏文章宽屏化

## 调试

1. 运行命令 `npm run watch`
2. 打开 Tampermonkey 的`实用工具`页面
3. 在最下方的`从 URL 安装`选项中填入网址`http://localhost:5555/index.js`，然后点击右侧安装即可

注：

油猴并不会自动从 URL 拿到最新的代码，所以每次更新代码都需要手动在油猴重新安装。
