// @flow

import BasePage from './BasePage'

const modalConfirm = '//*[@class="sweet-alert showSweetAlert visible"]'
const confirmButton = '//*[@class="confirm"]'
const cancelButton = '//*[@class="cancel"]'

export default class ModalConfirmation extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(modalConfirm)
  }

  async tapConfirmButton () {
    await this.click(confirmButton)
  }

  async tapCancelButton () {
    await this.click(cancelButton)
  }
}
