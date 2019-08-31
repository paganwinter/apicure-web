let api = {
  info: {
    name: 'Test API',
  },
  paths: {
    '/posts/{postId}': {
      get: {
        operationId: 'getPost',
        responses: {
          '200': {
            schema: {
              type: 'object',
            },
          },
          'default': {
            schema: {
              type: 'object',
            },
          }
        },
      },
    },
    '/posts': {
      post: {
        operationId: 'createPost',
        responses: {
          '201': {
            schema: {
              type: 'object',
              required: ['test'],
              properties: {
                userId: { type: 'string' },
                test: { type: 'string' },
              },
            },
          },
          'default': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  },
}
