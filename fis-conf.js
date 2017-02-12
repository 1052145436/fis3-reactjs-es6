fis
    .set('date', new Date)
    .set('project.watch.usePolling', true)

    .match('/static/images/**/*.{png,jpg}', {
        useHash: false,
        release:'/$0',
        query: '?t=' + (fis.get('date').getYear() + 1900)
        + (fis.get('date').getMonth() + 1)
        + (fis.get('date').getDate())
    })

    .match('*.{js,css,scss,eot,svg,ttf,woff}', {
        useHash: true
    })
    .match('/static/scss/(*).{css,scss}', {
        parser: fis.plugin('node-sass'),
        rExt: '.css',
        postprocessor: fis.plugin('autoprefixer', {
            browsers: [
                'last 3 versions',
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 6',
                'opera >= 12.1',
                'ios >= 6',
                'android >= 4.4',
                'bb >= 10'/*,
                'and_uc 9.9'*/
            ],
            cascade: true
        }),
        release: '/static/css/$1'
    })
    .hook('commonjs', {
        baseUrl: './static/js',
        extList: ['.js', '.jsx']
    })
    .match('{/static/js/*.js,*.jsx}', {
        // parser: fis.plugin('typescript'),

        // typescript 就是编译速度会很快，但是对一些 es7 的语法不支持，可以用 babel 来解决。用以下内容换掉 typescript 的parser配置就好了。
        parser: fis.plugin('babel-5.x', {
            sourceMaps: true,
            optional: ["es7.decorators", "es7.classProperties"]
        }),
        rExt: '.js'
    })

    .match('/static/js/*.{js,jsx}', {
        useHash: true,
        isMod: true,
        release: '/$0'
    })

    .hook('node_modules')
    .match('/node_modules/**.{js,jsx}', {
        isMod: true
    })

    .match('/static/plugins/*.js', {
        release: '/$0'
    })

    .hook('commonjs')
    .match('::package', {
        postpackager: fis.plugin('loader', {
            resourceType: 'mod',
            useInlineMap: true,
            allInOne: {
                includeAsyncs: true,
                sourceMap: true,
                useTrack: false
            }
        }),
        packager: fis.plugin('map')
    })


    // 生产
    .media('prod')

    .match('*.png',{
        optimizer:fis.plugin('png-compressor')
    })

    .match('*.{css,scss}',{
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })

    .match('/static/js/*.{js,jsx}',{
        optimizer: fis.plugin('uglify-js')
    })

    .match('::package', {
        spriter: fis.plugin('csssprites')
    });