testData = {
  getPost__200_001: {
    request: {
      path: {
        postId: 1,
      },
    },
    response: {
      status: 200,
    },
    stubs: {},
  },
  getPost__404_002: {
    request: {
      path: {
        postId: 1000,
      },
    },
    response: {
      status: 404,
    },
    stubs: {},
  },
  createPost__201_001: {
    request: {},
    response: {
      status: 201,
    },
    stubs: {},
  },
  createPost__200_002: {
    request: {},
    response: {
      status: 400,
    },
    stubs: {},
  },
}
