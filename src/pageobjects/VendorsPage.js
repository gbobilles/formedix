// @flow
import BasePage from './BasePage'

const VENDOR_PROFILE = '#profile'

export default class Vendors extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(VENDOR_PROFILE)
  }
}
