## webpack的核心概念

### 入口（entry)

  > 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。每个依赖项随即被处理，最后输出到称之为 bundles 的文件中

    ```js
      module.export = {
        entry: './path/to/my/entry/file.js'
      }
    ```

### 出口（output)

  >output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：

  ```js
    module.export = {
      entry: './index.js',
      output: {
        path: path.resovle(__dirname, 'dist'),
        filename: 'myWebpack.bundle.js'
      }
    }
  ```

### loader

  > loader 让 webpack能够处理那些非js文件，loader可以将所有类型的文件转化为webpack可以处理的`模块`。

  - `test`属性，用于标识别应该被对应的loader进行转换的某个或某些文件。
  - `use`属性，表示进行转换时应该使用何种loader

  ```js
    module.export = {
      entry: './index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'myWebpack.bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.txt$/, use: 'raw-loader',
          }
        ]
      }
    }
  ```
  以上对一个`module`对象定义了`rules`属性，包含两个必须属性：`test`和`use`，告诉webpack：

  > 当你碰到`require()/import`语句中被解析为`.txt`的路径时，在你对它打包前，先用`raw-loader`转换一下。

### 插件[plugins]

- `loader`用于解析各种类型的模块
- `plugins`可以执行范围更广的任务，从`打包优化`和`压缩`，到`重新定义环境变量`等等，可以处理各种各样的任务