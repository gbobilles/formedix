// @flow
import BasePage from './BasePage'

const DASH_BOARD_TAB_MENU = '#dashboardUrl'
const DASH_BOARD_QBO_DOWN = '//*[contains(text(), "QBO Integration is currently down")]'

export default class DashBoard extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(DASH_BOARD_TAB_MENU)
  }

  async isQBODown () {
    const qbodown = await this.locatorFound(DASH_BOARD_QBO_DOWN)
    return qbodown
  }
}
