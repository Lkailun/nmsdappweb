// @ts-check
const { i18n } = require('./next-i18next.config.js');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envFilePath = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
const envJson = dotenv.parse(fs.readFileSync(envFilePath));

// console.log('process.env.envJson', envJson);

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    webpack: function (config) {
        // config.module.rules.push({
        //     test: /\.js$/,
        //     include: /node_modules\/klinecharts/,
        //     use: ['babel-loader'],
        //     type: 'javascript/auto'
        // });

        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    env: envJson,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    compiler: {
        styledComponents: true
    },

    // enable /app
    experimental: {
        appDir: true
    },

    // configuring the output directory for dynamic pages
    output: 'standalone',

    transpilePackages: ['antd-mobile'],

    async rewrites() {
        return [];
    }
};

module.exports = nextConfig;
