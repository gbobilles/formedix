// @flow
import BasePage from '../BasePage'

const MAP_LOCATION = '#map'
const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'

export default class Map extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(MAP_LOCATION)
  }
}
