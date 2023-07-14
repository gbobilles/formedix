// @flow
import BasePage from '../BasePage'
import AddNewTicket from './AddNewTicket'
import ClientBulkUpload from './bulkUploadPage'

const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'
const CLIENT_DASHBOARD_TAB = '//a[text()=" Dashboard "]'
const CLIENT_ADD_TICKET = '//*[@type ="button" and text() = "+ Add Ticket"]'

export default class ClientPortalDashBoard extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(CLIENT_DASHBOARD_TAB)
    await this.waitForDisplayed(CLIENT_ADD_TICKET)
  }

  async tapClientDashboard () {
    await this.click(CLIENT_DASHBOARD_TAB)
  }
  async tapAddTicketButton () {
    await this.click(CLIENT_ADD_TICKET)
  }

  async isSomethingWentWrong () {
    const somethingWentWrong = await this.locatorFound(SOMETHING_WENT_WRONG)
    return somethingWentWrong
  }

  get addDispatch () {
    return new AddNewTicket()
  }

  get clientBulkUpload () {
    return new ClientBulkUpload()
  }
}
