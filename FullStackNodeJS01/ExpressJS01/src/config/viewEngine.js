const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    // Set folder chứa các file giao diện (views)
    app.set('views', path.join('./src/views'));
    // Set view engine để render các file giao diện
    app.set('view engine', 'ejs');
    // Set thư mục chứa các file tĩnh (css, js, images)
    app.use(express.static(path.join('./src/public')));
};
module.exports = configViewEngine;