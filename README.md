# my-electron-demo

**对electron学习的一次记录**
## electron: 使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用
## 本例子按照官网的例子稍作修改
- 官网: [https://electronjs.org](https://electronjs.org)
- 官方实例： [https://github.com/electron/electron-quick-start](https://github.com/electron/electron-quick-start)

一个基本的应用程序结构应该包括:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

## 使用

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install dependencies
npm install
# Run the app
npm start
```

## 关于打包

```bash
# Install
npm install electron-packager -g
# 示例
electron-packager . 可执行文件的文件名 --win --out 打包成的文件夹名 --arch=x64位还是32位  --overwrite --ignore=node_modules
# Run Build
electron-packager . mall --win --out presenterTool --arch=x64 --overwrite --ignore=node_modules
