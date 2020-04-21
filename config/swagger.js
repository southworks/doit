exports.options = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Todo API',
      description: '',
      version: '0.1.0'
    },
    host: 'localhost:' + process.env.PORT,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
};
