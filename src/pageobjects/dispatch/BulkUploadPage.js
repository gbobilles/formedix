// @flow
import BasePage from '../BasePage'
const JOB_TABLE = '#jobTable'
const BULK_UPLOAD = '#li_bulkDispatchUpload'
const BROWSE_FILE = '#JobsFile'
const UPLOAD_BUTTON = '//input[@type="submit" and @value="Upload"]'
const path = require('path')
const JOBS_TOTAL_UPLOADED = '#TotalJobs'
const JOBS_TOTAL_UPLOADED_SUCCESS = '#SuccessfullJobs'
const JOBS_TOTAL_UPLOADED_NO_MATCH = '#NoMatches'
const JOBS_TOTAL_UPLOADED_FAILED = '#FailedJobs'
const OK_MODAL_BUTTON = '//button[@class ="confirm"]'
const filePath = process.env.TEST_ENVIRONMENT === 'qa' ? path.join(__dirname, '../../lib/testdata/BulkUPload-D1.xlsx') : path.join(__dirname, '../../lib/testdata/BulkUPload-D1-Demo.xlsx')

export default class BulkUpload extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(JOB_TABLE)
  }

  async tapBulkUploadDispath () {
    await this.click(BULK_UPLOAD)
    await this.waitForDisplayed(BROWSE_FILE)
  }

  async uploadBulkDispatch () {
    await this.uploadfile(BROWSE_FILE, filePath)
  }

  async tapUploadButton () {
    await this.click(UPLOAD_BUTTON)
    await this.waitForDisplayed(JOBS_TOTAL_UPLOADED)
  }

  async getTotalNumberJobsUploaded () {
    const totalNumberJobsUploaded = await this.getText(JOBS_TOTAL_UPLOADED)
    return totalNumberJobsUploaded
  }

  async getTotalJobsSuccessfullyUploaded () {
    const totalJobsUploadedSuccess = await this.getText(JOBS_TOTAL_UPLOADED_SUCCESS)
    return totalJobsUploadedSuccess
  }

  async getTotalJobsUploadedWithNoMatch () {
    const totalJobsUploadedWithNoMatch = await this.getText(JOBS_TOTAL_UPLOADED_NO_MATCH)
    return totalJobsUploadedWithNoMatch
  }

  async getTotalNumberJobsUploadedFailed () {
    const totalJobsNumberUploadedFailed = await this.getText(JOBS_TOTAL_UPLOADED_FAILED)
    return totalJobsNumberUploadedFailed
  }

  async tapOKButton () {
    await this.click(OK_MODAL_BUTTON)
  }
}
