// @flow
import LoginSteps from '@step-objects/LoginSteps'
import CoreDispatch from '@step-objects/DispatchCoreSteps'
import SessionClose from '@step-objects/SessionCloseSteps'

const loginSteps = new LoginSteps()
const dispatch = new CoreDispatch()
const killSessions = new SessionClose()

describe(`Regression - Work Market Integration process flow  - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, function () {
  it(`Regression - Work Market Integration process flow  - ${process.env.TEST_ENVIRONMENT.toUpperCase()} server`, async function () {
    await loginSteps.Corelogin()
    await dispatch.createNewDispatch()
    await dispatch.searchTicket('automated')
    await dispatch.createAssignMentForWorkMarket()
    await killSessions.sessionKill()
  })
})
