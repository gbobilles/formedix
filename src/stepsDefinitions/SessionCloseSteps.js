import driverutils from '@core-libs/driver-utils'
import {step} from '@core-libs/AllurUtil'

export default class SessionCloseSteps {
  async sessionKill () {
    await step('kill session', async function () {
      await driverutils.close()
    })
  }
}
