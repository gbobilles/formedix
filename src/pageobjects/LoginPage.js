// @flow
import BasePage from './BasePage'

const NEXT_BUTTON = '#idSIButton9'
const EMAIL = '//input[@type="email"]'
const LOGIN_BUTTON = '//*[@class="btn btn-default submit"]'
const PASSWORD = '//input[@name="passwd"]'
const SIGNIN_BUTTON = '//input[@type="submit"]'
const PROFUP_REDIRECT_NEXT_BUTTON = '#idSubmit_ProofUp_Redirect'
const CANCEL_LINK_TD = '#CancelLinkTd'
const STAY_SIGNIN_BUTTON = '//input[@type="submit"]'

export default class LoginPage extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(LOGIN_BUTTON)
  }

  async tapLoginButton () {
    await this.click(LOGIN_BUTTON)
  }

  async loginExistingUser (username: string, password: string) {
    await this.sendKeys(EMAIL, username)
    await this.click(NEXT_BUTTON)
    await this.waitForDisplayed(PASSWORD)
    await this.sendKeys(PASSWORD, password)
    await this.click(SIGNIN_BUTTON)
    await this.click(PROFUP_REDIRECT_NEXT_BUTTON)
    await this.waitForDisplayed(CANCEL_LINK_TD)
    await this.click(CANCEL_LINK_TD)
    await this.waitForDisplayed(STAY_SIGNIN_BUTTON)
    await this.click(STAY_SIGNIN_BUTTON)
  }
}
