let mix = require('laravel-mix');
const fs = require("fs");
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

/**
 * Read Files in directory
 * node_modules/bootstrap/scss/utilities
 */
const utilitiesFolder = path.resolve("utilities");
const utilities = fs.readdirSync(utilitiesFolder);

/**
 * Mix before loop
 */
mix.sass('utilities.scss', 'css');

/**
 * Add Utilities
 */
for (const utility of utilities) {
    // Add utility
    mix.sass(`utilities/${utility}`, 'css/utilities')
}


mix.setPublicPath('css');
