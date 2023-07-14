// @flow
import BasePage from './BasePage'

const HELP_CONTENT_COLLECTION = '#dv_help_Content'

export default class Help extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(HELP_CONTENT_COLLECTION)
  }
}
