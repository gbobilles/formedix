// @flow
import { assert } from 'chai'
import allureReporter from '@wdio/allure-reporter'
import LoginPage from '@page-objects/LoginPage'
import driverutils from '@core-libs/driver-utils'
import CustomerTestData from '@input-data/CustomerTestData'
import {step} from '@core-libs/AllurUtil'

const loginpage = new LoginPage()


  describe(`Acceptance Tests - adding line items on financial in a dispatch ticket- and Validate no server error happen on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
    let testTitle = this.title
    it(`Adding line items on financial in a dispatch ticket -  and Validate no server error happen on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
      await step('Preparing test data', async function () {
        await driverutils.addAllureReport(allureReporter, __dirname, 'Dispatch Adding Materials', testTitle)
        await driverutils.goToHome()
        await loginpage.isLoaded()
      })

      await step('Sign in as exiting user', async function () {
        await loginpage.tapLoginButton()
        await loginpage.loginExistingUser(CustomerTestData.loginCredentials.username, CustomerTestData.loginCredentials.password)
      })
    })
  })
