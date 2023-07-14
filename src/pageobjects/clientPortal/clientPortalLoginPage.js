// @flow
import BasePage from '../BasePage'

const PASSWORD = '#exampleInputPassword1'
const EMAIL = '#exampleInputEmail1'
const SIGN_IN_BUTTON = '//*[@type="submit" and text()="SIGN IN"]'

export default class ClientPortalLoginPage extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(SIGN_IN_BUTTON)
  }

  async tapLoginButton () {
    await this.click(SIGN_IN_BUTTON)
  }

  async loginExistingUser (username: string, password: string) {
    await this.click(EMAIL)
    await this.sendKeys(EMAIL, username)
    await this.click(PASSWORD)
    await this.sendKeys(PASSWORD, password)
    await this.click(SIGN_IN_BUTTON)
  }
}
