module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angulartics/dist/angulartics.min.js',
            'app/bower_components/angulartics/dist/angulartics-ga.min.js',
            'app/gary/js/main.js',
            'test/**/*.js'
        ]
    });
};