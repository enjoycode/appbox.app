module.exports = {
    publicPath: '/app/',
    runtimeCompiler: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.211.55.3:5000/',
                secure: false
            },
            '/blob': {
                target: 'http://10.211.55.3:5000/',
                secure: false
            },
            '/wsapi': {
                target: 'ws://10.211.55.3:5000/',
                secure: false,
                ws: true
            },
            '/ssh': {
                target: 'ws://10.211.55.3:5000/',
                secure: false,
                ws: true
            }
        }
    }
}