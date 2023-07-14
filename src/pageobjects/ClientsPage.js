// @flow
import BasePage from './BasePage'

const CLIENT_DATA_TABLE = '#ClientLocationsTable'
const CLIENT_SEARCH = '#tbSearch'
const SEARCH_ICON = '.search-icon'
const CLINT_VIEW_ACTIVE = '.clientView'

export default class Clients extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(CLIENT_DATA_TABLE)
  }

  async searchClientName (client: string) {
    await this.sendKeys(CLIENT_SEARCH, client)
  }

  async tapSearchIcon () {
    await this.click(SEARCH_ICON)
    await this.click(CLINT_VIEW_ACTIVE)
  }
}
