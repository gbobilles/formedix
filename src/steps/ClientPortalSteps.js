import {step} from '@core-libs/AllurUtil'
import Dashboard from '@page-objects/clientPortal/clientPortalDashBoardPage'
import { assert } from 'chai'

const clienPortalDashboard = new Dashboard()
const addTicket = clienPortalDashboard.addDispatch
const bulkupload = clienPortalDashboard.clientBulkUpload

export default class ClientPortalSteps {
  async clientBulkUpload () {
    await step('Tap add ticket button', async function () {
      await clienPortalDashboard.tapAddTicketButton()
      await addTicket.isLoaded()
    })

    await step('Tap Bulk Upload button', async function () {
      await bulkupload.tapBulkUpload()
      await bulkupload.isLoaded()
    })

    await step('Upload Bulk upload file', async function () {
      await bulkupload.uploadBulkDispatch()
    })

    await step('Tap Validate Button', async function () {
      await bulkupload.tapValidateBtn()
    })

    await step('Tap Continue Save Button', async function () {
      await bulkupload.tapContinueSaveBtn()
      assert.isTrue(await bulkupload.isSuccessMessageDisplayed(), 'Success message wast not shown')
    })
  }

  async createDispatch () {
    await step('Tap add ticket button', async function () {
      await clienPortalDashboard.tapAddTicketButton()
      await addTicket.isLoaded()
    })

    await step('Add issue description', async function () {
      await addTicket.addTicketIssue()
    })

    await step('Add Scope of work description', async function () {
      await addTicket.addScopeOfWorks()
    })

    await step('Add Work Order', async function () {
      await addTicket.addClientWONumber()
    })

    await step('Add Purchase Order', async function () {
      await addTicket.addClientPONumber()
    })

    await step('Tap Problem Code', async function () {
      await addTicket.tapProblemCode()
    })

    await step('Select End Client', async function () {
      await addTicket.selectEndClient()
    })

    await step('Select End Client Country', async function () {
      await addTicket.selectEndClientCountry()
    })

    await step('Select End Client Location', async function () {
      await addTicket.selectEndClientLocation(['San Francisco,  CA', 'Dayton, OH '])
    })

    await step('Select Technician Level', async function () {
      await addTicket.selectTechLevel()
    })

    await step('Select Number of Technicians', async function () {
      await addTicket.selectTechNumbers()
    })

    await step('Tap Add Buttton', async function () {
      await addTicket.tapAddBtn()
    })

    await step('Add Schedule Date', async function () {
      await addTicket.addScheduleDate()
    })

    await step('Add Required Tools', async function () {
      await addTicket.addRequiredTool()
    })

    await step('Tap Save Button and verify My Ticket menu is highlighted', async function () {
      await addTicket.tapSaveBtn()
      await clienPortalDashboard.isLoaded()
      assert.equal(await addTicket.getValue(), 'tickets ng-star-inserted active')
    })
  }
}
