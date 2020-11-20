module.exports = {
    // 打包路径配置
    publicPath: process.env.NODE_ENV === 'production' ? '':'/',
    // 构建项目生成的目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist':'devDist',
    //关闭语法的自动检测
    lintOnSave:false,
    // webpack 打包的配置
    configureWebpack:{
        performance: {
		    hints:false
	    }
    },
    css: {
        loaderOptions: { 
          scss: {
            prependData: `@import "./src/styles/main.scss";`
          },
        }
      }

}