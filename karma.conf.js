module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        client: {
            clearContext: false
        },
        reporters: ['progress', 'karma-typescript'],
        files: [
            'src/**/*.ts',
            'spec/**/*.ts'
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript'
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                'target': 'es5',
                'module': 'commonjs',
                'lib': ['es2015', 'dom']
            },
            types: ['jasmine']
        },
        browsers: ['Chrome']
    })
};