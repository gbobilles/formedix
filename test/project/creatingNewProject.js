// @flow
import LoginSteps from '@step-objects/LoginSteps'
import CoreDispatch from '@step-objects/DispatchCoreSteps'
import SessionClose from '@step-objects/SessionCloseSteps'

const loginSteps = new LoginSteps()
const createProject = new CoreDispatch()
const killSessions = new SessionClose()

describe(`Project - Creating a new Project on  - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, function () {
  let testTitle = this.title
  it(`Project - Creating a new Project on  - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, async function () {
    await loginSteps.Corelogin(testTitle)
    await createProject.projectCreation()
    await killSessions.sessionKill()
  })
})
