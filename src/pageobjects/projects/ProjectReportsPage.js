// @flow
import BasePage from '../BasePage'

const PROJECT_REPORTS_TABLE = '.NumberOfProjectJobsByCountryTable'
const PROJECT_JOBS_BY_COUNTRY = '#li_settings_projectsjobsByCountry'
const PROJECT_PC_MISSING_REPORT = '#li_reports_pcassigningReport'
const PROJECT_REVENUE_BY_COUNTRY = '#li_settings_projectRevenueByCountry'
const PROJECT_REVENUE = '#li_settings_projectRevenue'
const PROJECT_BILLABLE_JOBS = '#li_settings_projectBillableProjectJobs'
const PROJECT_RISK_ISSUE = '#li_settings_projectRiskAndIssue'
const PROJECT_JOBS_ASSETS = '#li_settings_allProjectJobAssets'
const PROJECT_ASSET_OUT_REPORT = '#li_settings_assetOutReport'
const PROJECT_STANDARD_REPORT = '#li_settings_standardReport'

export default class ProjectReports extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(PROJECT_REPORTS_TABLE)
  }

  async tapProjectReportJobsByCountry () {
    await this.click(PROJECT_JOBS_BY_COUNTRY)
  }

  async tapProjectReportPcMissingReport () {
    await this.click(PROJECT_PC_MISSING_REPORT)
  }

  async tapProjectReportRevenueByCountry () {
    await this.click(PROJECT_REVENUE_BY_COUNTRY)
  }

  async tapProjectReportRevenue () {
    await this.click(PROJECT_REVENUE)
  }

  async tapProjectReportBillableJobs () {
    await this.click(PROJECT_BILLABLE_JOBS)
  }

  async tapProjectReportRiskIssue () {
    await this.click(PROJECT_RISK_ISSUE)
  }

  async tapProjectReportJobsAssets () {
    await this.click(PROJECT_JOBS_ASSETS)
  }

  async tapProjectReportAssetOutReport () {
    await this.click(PROJECT_ASSET_OUT_REPORT)
  }

  async tapProjectReportStandardReport () {
    await this.click(PROJECT_STANDARD_REPORT)
  }
}
