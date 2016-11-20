const config = {
  db:{
    host: '127.0.0.1',
    user: 'root',
    password: 'admin888',
    database:'ngblog',
    port: 3306
  },
  port:5000,
  host: '0.0.0.0',
  staging: false,
  // debug 为 true 时，用于本地调试，deprecated
  debug: true,

}

module.exports = config;