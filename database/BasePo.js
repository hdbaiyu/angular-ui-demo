/**
 * Base object that all database objects should extend to use basic CURD
 *
 * v0.1 - 2014-10-18
 *
 * @author 
 */
var ConnectionPool = require('./mysql_connection_pool');
var util = require('util');
var logger = require('../services/loggerUtil.js').getLogger("BasePO");

// var SQL_SELECT_ALL = "";
// var SQL_SELECT_BY_PRIMARY_KEYS = "";
// var SQL_INSERT_RECORD = "";
// var SQL_UPDATE_RECORD = "";
// var SQL_DELETE_BY_PRIMARY_KEYS = "";

/*
 * Cover basic operation in base class
 */
function BasePO(selectAll, selectOne, insert, update, deleteOne){
    var method = "BasePO";
    logger.debug(method, "BasePO initialization...");

    this.SQL_SELECT_ALL = selectAll;
    this.SQL_SELECT_BY_PRIMARY_KEYS = selectOne;
    this.SQL_INSERT_RECORD = insert;
    // TODO: add the ones below
    this.SQL_UPDATE_RECORD = update;
    this.SQL_DELETE_BY_PRIMARY_KEYS = deleteOne;

}

BasePO.prototype.selectAll = function(callback) {
  var method = "selectAll";
  var SQL_SELECT_ALL_cur = this.SQL_SELECT_ALL;
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error(method, SQL_SELECT_ALL_cur);
            logger.error(method, err);
            throw err;
        } else {
             connection.query(SQL_SELECT_ALL_cur, function(err, rows) {
                if (err) {
                    connection.release();
                    throw err;
                }
                // And done with the connection.
                logger.debug(method, "Found records: " + rows.length);
                connection.release();
                callback(rows);
            });
        }
    });
};

BasePO.prototype.selectOne = function(keys, callback) {
  var method = "selectOne";
  var SQL_SELECT_BY_PRIMARY_KEYS_cur = this.SQL_SELECT_BY_PRIMARY_KEYS
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error(method, SQL_SELECT_BY_PRIMARY_KEYS_cur + " - " + keys);
            logger.error(method, err);
            throw err;
        } else {
             connection.query(SQL_SELECT_BY_PRIMARY_KEYS_cur, keys, function(err, rows) {
                if (err) {
                    connection.release();
                    throw err;
                }
                // And done with the connection.
                logger.debug(method, "Found records: " + rows.length);
                connection.release();
                callback(rows);
            });
        }
    });
};

BasePO.prototype.insertOne = function(object, callback) {
  var method = "insertOne";
  var SQL_INSERT_RECORD_cur = this.SQL_INSERT_RECORD;
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error(method, SQL_INSERT_RECORD_cur + " - " + JSON.stringify(object));
            logger.error(method, err);
            throw err;
        } else {
            logger.debug(method, "Insert object: " + JSON.stringify(object));
            var query = connection.query(SQL_INSERT_RECORD_cur, object, function(err, result) {
                if (err) {
                    connection.release();
                    throw err;
                } else {
                    connection.release();
                    logger.debug(method, "Result: " + JSON.stringify(result));
                    if (callback) {
                        callback(result);
                    }
                }
            });
            logger.debug(method, query.sql);
        }
    });
};

BasePO.prototype.deleteOne = function(object, callback) {
  var method = "deleteOne";
  var SQL_DELETE_BY_PRIMARY_KEYS_cur = this.SQL_DELETE_BY_PRIMARY_KEYS;
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error(method, SQL_DELETE_BY_PRIMARY_KEYS_cur + " - " + JSON.stringify(object));
            logger.error(method, err);
            throw err;
        } else {
            logger.debug(method, "deleteOne object: " + JSON.stringify(object));
            var query = connection.query(SQL_DELETE_BY_PRIMARY_KEYS_cur, object, function(err, result) {
                if (err) {
                    connection.release();
                    throw err;
                } else {
                    connection.release();
                    logger.debug(method, "Result: " + result);
                    if (callback) {
                        callback(result);
                    }
                }
            });
            logger.debug(method, query.sql);
        }
    });
};

BasePO.prototype.updateOne = function(object, callback) {
  var method = "updateOne";
  var SQL_UPDATE_RECORD_cur = this.SQL_UPDATE_RECORD;
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error(method, SQL_UPDATE_RECORD_cur + " - " + JSON.stringify(object));
            logger.error(method, err);
            throw err;
        } else {
            logger.debug(method, "updateOne object: " + object);
            var query = connection.query(SQL_UPDATE_RECORD_cur, object, function(err, result) {
                if (err) {
                    connection.release();
                    throw err;
                } else {
                    connection.release();
                    logger.debug(method, "Result: " + result);
                    if (callback) {
                        callback(result);
                    }
                }
            });
            logger.debug(method, query.sql);
        }
    });
};

/*
 * Common function to execute SQL
 * @param sql
 *        sql language e.g insert into tenx_users set ?
 * @param params
 *        the JSON params to execute SQL
 *        e.g.
 *         { id: userInfo.user_id,
 *           name: userInfo.user_name,
 *           email : userInfo.email
 *         }
 *
 */
BasePO.prototype.executeSQL = function(sql, params, callback) {
  var method = "executeSQL";
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error(method, sql + " - " + JSON.stringify(params));
            logger.error(method, err);
            throw err;
        } else {
             connection.query(sql, params, function(err, rows) {
                if (err) {
                    connection.release();
                    logger.error(method, "execute SQL error: " + JSON.stringify(err));
                    callback(err, rows);
                    return;
                }
                // And done with the connection.
                logger.debug(method, "Found records: " + rows.length);
                connection.release();
                callback(err, rows);
            });
        }
    });
};

BasePO.prototype.runInConnection = function(callback) {
    var method = 'runInConnection';
    ConnectionPool.getConnection(function(err, connection) {
        // Use the connection
        if (err) {
            logger.error('runInConnection', err);
            throw err;
        } else {
            callback(connection);
        }
    });
};

module.exports = BasePO;
