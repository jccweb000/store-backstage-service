const path = require('path');

module.exports = {
  mode: 'production', // 设置为 'development' 或 'production'
  entry: './src/app.ts', // 入口文件
  target: 'node', // 指定打包目标为 Node.js
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  resolve: {
    extensions: ['.ts', '.js'], // 解析的文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: 'ts-loader', // 使用 ts-loader 处理
        exclude: /node_modules/, // 排除 node_modules
      },
    ],
  },
};