const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.js('resources/js/app.js', 'public/mix')
    .js('resources/js/quiz.js', 'public/mix')
    .ts('resources/js/editor.ts', 'public/mix')
    .sass('resources/scss/main.scss', 'public/mix').options({
        processCssUrls: false,
    })
    .disableNotifications()
    .browserSync({
        proxy: 'http://localhost:8000/',
        notify: false,
    });
