// @flow
import LoginSteps from '@step-objects/LoginSteps'
import CoreDispatch from '@step-objects/DispatchCoreSteps'
import SessionClose from '@step-objects/SessionCloseSteps'

const loginSteps = new LoginSteps()
const bulkupload = new CoreDispatch()
const killSessions = new SessionClose()

describe(`Regression - Dispatch Bulk Work on - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, function () {
  let testTitle = this.title
  it(`Regression - Dispatch Bulk Work on - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, async function () {
    await loginSteps.Corelogin(testTitle)
    await bulkupload.dispatchBulkUpload()
    await killSessions.sessionKill()
  })
})
