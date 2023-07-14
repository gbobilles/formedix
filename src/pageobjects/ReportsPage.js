// @flow
import BasePage from './BasePage'

const REPORTS_TAB_MENU = '#reportsUrl'
const VIEW_ALL_REPORTS = '//a[text()="View All Reports"]'
const REPORTS_DATA_TABLE = '#dataTable'

export default class Reports extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(REPORTS_DATA_TABLE)
  }

  async hoverOverReports () {
    await this.moveToLocatorPosition(REPORTS_TAB_MENU)
  }

  async tapViewAllProjects () {
    await this.hoverOverReports()
    await this.click(VIEW_ALL_REPORTS)
  }
}
