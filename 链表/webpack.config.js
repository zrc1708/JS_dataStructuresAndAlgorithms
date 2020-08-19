const { resolve } = require('path');

module.exports = {
  entry: './创建链表/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, '创建链表/build')
  },
  mode: 'development',
};
