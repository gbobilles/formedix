// @flow
import BasePage from './BasePage'

const BILLING_SETTINGS = '#dv_settings'

export default class Billing extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(BILLING_SETTINGS)
  }
}
