# zhihu-utils

针对知乎的脚本工具

## 调试

1. 运行命令

```bash
pnpm run watch
```

2. 检查网址`http://localhost:5555/index.js`是否展示代码
3. 打开 Tampermonkey 的`实用工具`页面
4. 在最下方的`从 URL 安装`选项中填入网址`http://localhost:5555/index.js`，然后点击右侧安装即可

注：

油猴并不会自动从 URL 拿到最新的代码，所以每次更新代码都需要手动在油猴重新安装。
