const {environment} = require('@rails/webpacker');

const webpack = require('webpack');
environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
    antd: 'antd',
    $: 'jquery',
    jQuery: 'jquery',
    THREE: 'three',
    Popper: ['popper.js', 'default'],
    'react-router': 'react-router',
    'react-router-dom': 'react-router-dom',
    'react-router-native': 'react-router-native',
    'react-router-config': 'react-router-config'
}));

module.exports = environment;