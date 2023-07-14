// @flow
import SessionClose from '@step-objects/SessionCloseSteps'
import LoginSteps from '@step-objects/LoginSteps'
import ClientPortalSteps from '@step-objects/ClientPortalSteps'

const loginSteps = new LoginSteps()
const clientPortal = new ClientPortalSteps()
const killSessions = new SessionClose()

describe(`Client Portal - Creating a new dispatch ticket from client portal - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, function () {
  let testTitle = this.title
  it(`Client Portal - Creating a new dispatch ticket from client portal - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, async function () {
    await loginSteps.ClientPortalLogin(testTitle)
    await clientPortal.createDispatch()
    await killSessions.sessionKill()
  })
})
