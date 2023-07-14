// @flow
import BasePage from '../BasePage'

const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'
const BULK_UPLOAD_BUTTON = '//button[text() = "Bulk Ticket Upload"]'
const VALIDATE_BUTTON = '//button[text() = "Validate"]'
const BROWSE_FILE = '//input[@type= "file"]'
const path = require('path')
const filePath = process.env.TEST_ENVIRONMENT === 'qa' ? path.join(__dirname, '../../lib/testdata/ClientPortalBulkUpload.xlsx') : path.join(__dirname, '../../lib/testdata/ClientPortalBulkUpload-Demo.xlsx')
const BACK_ADD_TICKET_BTN = '//button[text() = "Back to Add Ticket"]'
const CONTINUE_SAVE_BTN = '//button[text() = " Continue Save"]'
const UPLOAD_AGAIN_BTN = '//button[text() = "Upload Again"]'

export default class ClientBulkUpload extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(BACK_ADD_TICKET_BTN)
    await this.waitForDisplayed(VALIDATE_BUTTON)
  }

  async isSomethingWentWrong () {
    const somethingWentWrong = await this.locatorFound(SOMETHING_WENT_WRONG)
    return somethingWentWrong
  }

  async tapBulkUpload () {
    await this.click(BULK_UPLOAD_BUTTON)
  }

  async uploadBulkDispatch () {
    await this.uploadfile(BROWSE_FILE, filePath)
  }

  async tapValidateBtn () {
    await this.click(VALIDATE_BUTTON)
  }

  async tapContinueSaveBtn () {
    await this.waitForExist(CONTINUE_SAVE_BTN)
    await this.click(CONTINUE_SAVE_BTN)
  }

  async isSuccessMessageDisplayed () {
    await this.waitForExist(UPLOAD_AGAIN_BTN)
    return this.isExistingWithin(UPLOAD_AGAIN_BTN)
  }
}
