let utils = {
  extractOpIdFromTestId: function (fileName) {
    return fileName.split('__')[0]
  },

  getResponseSchema: function (status, op) {
    if (op.responses[status]) {
      return op.responses[status].schema
    }
    if (op.responses['default']) {
      return op.responses['default'].schema
    }
    throw new Error(`Status code '${status}' not defined in swagger, nor 'default' provided`)
  },

  constructPath: function (reqPath, opPath) {
    if (typeof reqPath === 'string') {
      return reqPath
    }
    
    let pathStr = opPath
    for (let pathParam in reqPath) {
      pathStr = pathStr.replace(new RegExp(`{${pathParam}}`), reqPath[pathParam])
    }
    return pathStr
  },

  makeApiCall: async function (opts) {
    let result
    let { url, method, headers, body } = opts
    try {
      let response = await fetch(url, { method, headers, body })
      result = {
        status: response.status,
        headers: response.headers,
      }
      try {
        result.body = await response.json()
      } catch (err) {
        result.error = err
      }
    } catch (err) {
      result.error = err
    }
    return result
  },

  generateOpsMap: function (api) {
    let ops = {}
    for (let path in api.paths) {
      for (let method in api.paths[path]) {
        if (api.paths[path][method].responses) {
          let op = api.paths[path][method]
          let opId = op.operationId || `${method}_${path}`
          ops[opId] = Object.assign(op, { method, path })
        }
      }
    }
    return ops
  },

  genApiReqOpts: function (reqData, op, config) {
    let { path, headers, body } = reqData
    let method = op.method
    let url = config.host + this.constructPath(path, op.path)

    return { url, method, headers, body }
  },

  genExpRes: function (resData, op, config) {
    let { status, headers, body } = resData
    let schema = this.getResponseSchema(status, op)

    return { status, headers, body, schema }
  },
}
