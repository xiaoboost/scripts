# @scripts/zhihu

自己用的知乎辅助工具

## 安装

[greasyfork](https://greasyfork.org/scripts/437940)

## 路线图

- [x] 隐藏侧边栏
- [x] 图片可隐藏
  - [x] 回答
  - [ ] 专栏
- [ ] 屏蔽盐选内容
- [x] 专栏文章宽屏化
- [x] 标记已读回答

## 调试

1. 运行命令 `npm run watch`
2. 打开 Tampermonkey 的`实用工具`页面
3. 在最下方的`从 URL 安装`选项中填入网址`http://localhost:5555/index.js`，然后点击右侧安装即可

注：

油猴并不会自动从 URL 拿到最新的代码，所以每次更新代码都需要手动在油猴重新安装。
