// console.log(api)
// console.log(config)
// console.log(testData)
let ajv = new Ajv({ allErrors: true })


config.api = api
let ops = utils.generateOpsMap(api)
console.log(ops)

mocha.setup('bdd')
describe(`${api.info.name}`, function () {
  for (let testId in testData) {
    let testDt = testData[testId]

    let testDesc = testDt.description
    let op = ops[utils.extractOpIdFromTestId(testId)]

    let apiReqOpts = utils.genApiReqOpts(testDt.request, op, config)
    let expRes = utils.genExpRes(testDt.response, op, config)
    let result
    console.log(testId, apiReqOpts, expRes)

    describe(`${testId} - ${testDesc}`, function() {
      before(async function () {
        result = await utils.makeApiCall(apiReqOpts)
        console.log(testId, result)
      })

      it('API should respond', function () {
        chai.expect(result.error).to.be.undefined
      })

      it(`status code should be '${expRes.status}'`, function () {
        chai.expect(result.status).to.equal(expRes.status)
      })

      it(`response body should match the swagger schema for '${expRes.status}'`, function () {
        let schemaValid = ajv.validate(expRes.schema, result.body)
        console.error(ajv.errorsText(), ajv.errors)
        chai.expect(schemaValid).to.equal(true, ajv.errorsText())
      })

      // it(`response should contain expected headers`)
      it(`response body should match the expected response body`)
    })
  }
})
mocha.checkLeaks()
mocha.run()
