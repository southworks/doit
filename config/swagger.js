exports.options = {
    routePrefix: '/documentation',
    swagger: {
        info: {
          title: 'Todo API',
          description: '',
          version: '0.1.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
      },
      exposeRoute: true
  }