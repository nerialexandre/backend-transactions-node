module.exports = {

  modules: {
    expressWinston: {
      transports: {
        file: {
          level: 'error',
          silent: false,
          filename: '/app.log',
          maxsize: 5242880,
          maxFiles: 5
        },
        console: {
          level: 'info',
          silent: false
        }
      },
      meta: false,
      expressFormat: true
    },
    winston: {
      transports: {
        file: {
          level: 'error',
          silent: false,
          filename: '/app.log',
          maxsize: 5242880,
          maxFiles: 5
        },
        console: {
          level: 'info',
          silent: false
        }
      }
    }
  }

}
