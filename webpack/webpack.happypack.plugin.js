/*
 * @Author: changluo
 * @Description:happypack开启多进程Loader转换
 * 原理：在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。
 * 日常开发中我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。
 * 由于js单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。
 *
 * HappyPack的基本原理：
 * 可利用多进程对文件进行打包(默认cpu核数-1)，对多核cpu利用率更高，可以让 Webpack 同一时间处理多个任务，发挥多核 CPU 的能力，
 * 将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间。
 */
// 多进程loader
const HappyPack = require("happypack");
// node 提供的系统操作模块
const os = require("os");
//  构造出共享进程池，根据系统的内核数量，指定进程池个数，也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const createHappyPlugin = (id, loaders) =>
  new HappyPack({
    // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
    id: id,
    // 如何处理 .js,.ts 文件，用法和 Loader 配置中一样
    loaders: loaders,
    // 其它配置项(可选)
    // 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多
    threadPool: happyThreadPool,
    // 是否允许 HappyPack 输出日志，默认是 true
    verbose: true,
    // threads：代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数
  });
module.exports = createHappyPlugin;
