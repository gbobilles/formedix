// @flow
import { assert } from 'chai'
import allureReporter from '@wdio/allure-reporter'
import LoginPage from '@page-objects/LoginPage'
import driverutils from '@core-libs/driver-utils'
import CustomerTestData from '@input-data/CustomerTestData'
import Dispatch from '@page-objects/dispatch/DispatchPage'
import MainPage from '@page-objects/MainPage'
import WentWrong from '@page-objects/somethingwentwrong/SomethingWentWrongPage'
import {step} from '@core-libs/AllurUtil'

const loginpage = new LoginPage()
const dispatch = new Dispatch()
const mainPage = new MainPage()
const wentwrong = new WentWrong()

let defaultLineItemCount

const dataProvider = [
  {dispatchNumber: 'K15752-15622', dispatchStatus: 'To Be Schedule Status', lineItem: 'Materials'},
  {dispatchNumber: 'K15325-15195', dispatchStatus: 'Schedule', lineItem: 'Reimbursements'},
  {dispatchNumber: 'K15717-15587', dispatchStatus: 'In-Work', lineItem: 'Labor - Revisit'},
  {dispatchNumber: 'K15310-15180', dispatchStatus: 'Pending Deliverables', lineItem: 'Travel - Revisit'},
  {dispatchNumber: 'K15752-15622', dispatchStatus: 'To Be Schedule Status', lineItem: 'Materials - Revisit'},
  {dispatchNumber: 'K15325-15195', dispatchStatus: 'Schedule', lineItem: 'Reimbursements Revisit'},
  {dispatchNumber: 'K15717-15587', dispatchStatus: 'In-Work', lineItem: 'Cancellation Fee'},
  {dispatchNumber: 'K15310-15180', dispatchStatus: 'Pending Deliverables', lineItem: 'Revisit Fee'}
]
dataProvider.forEach(function (test) {
  describe(`Acceptance Tests - adding ${test.lineItem} line items on financial in a dispatch ticket- ${test.dispatchStatus} and Validate no server error happen on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
    let testTitle = this.title
    it(`Adding ${test.lineItem} line items on financial in a dispatch ticket - ${test.dispatchStatus} and Validate no server error happen on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
      await step('Preparing test data', async function () {
        await driverutils.addAllureReport(allureReporter, __dirname, 'Dispatch Adding Materials', testTitle)
        await driverutils.goToHome()
        await loginpage.isLoaded()
      })

      await step('Sign in as exiting user', async function () {
        await loginpage.tapLoginButton()
        await loginpage.loginExistingUser(CustomerTestData.loginCredentials.username, CustomerTestData.loginCredentials.password)
      })

      await step('Tap Manage Dispatch', async function () {
        await mainPage.tapManageDispatch()
        await dispatch.isLoaded()
      })

      await step('Search dispatch numnber "K15752-15622" on search', async function () {
        await dispatch.searchDispatch(test.dispatchNumber)
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Financials after adding new line item', async function () {
        await dispatch.tapDispatchFinancials()
        defaultLineItemCount = await dispatch.getNumberOfLineItems()
        await dispatch.tapAddNewLineItems()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Select Material line item and First Technician option', async function () {
        await dispatch.selectLineItem(test.lineItem)
        test.dispatchStatus === 'Draft' ? await dispatch.selectFirstTechOnLineItem() : await dispatch.selectFirstTechOnLineItem(1)
        if (test.lineItem === 'Materials' || test.lineItem === 'Materials - Revisit') { await dispatch.addMaterialDetails('this is just a test adding material item') }
      })

      await step('Saving new added line item', async function () {
        await dispatch.tapSaveLineItem()
        assert.isTrue(await dispatch.isSaveLineItemSucessful(), 'Save line item failed')
      })

      await step('Verify newly added line item was added', async function () {
        const actual = defaultLineItemCount
        const expected = await dispatch.getNumberOfLineItems()
        assert.isAbove(expected, actual, 'the newly create line item is not added')
      })

      await step('Verify that the correct line item was added correctly', async function () {
        const actual = test.lineItem
        const expected = await dispatch.getLastExpenseType()
        assert.strictEqual(expected, actual, 'the newly create line item is not added')
      })

      await step('Verify after adding new line iten in financial and not result to server error', async function () {
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify deleting last line item entry in financial and not result to server error', async function () {
        await dispatch.deleteLineItemLastEntry()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('kill session', async function () {
        await driverutils.close()
      })
    })
  })
})
