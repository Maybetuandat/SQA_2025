const express = require('express')
const { getAllTest } = require('../services/test.service')

const db = require("../models/index");
const getHomePage = async (req, res) => {
    res.render('upload-test.ejs')
}
const testapi = async (req, res) => {
    res.render('upload-test')
}

const getLoginAdmin = async (req, res) => {
    res.render("admin/pages/login/login.pug");
}

module.exports = { getHomePage, getLoginAdmin }