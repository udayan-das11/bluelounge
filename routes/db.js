var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:welcome1@localhost:5432/postgres";
var db;

function connectDatabase() {
    if (!db) {
		db = new pg.Client(process.env.DATABASE_URL);
        db.connect();
    }
    return db;
}

module.exports = connectDatabase();
