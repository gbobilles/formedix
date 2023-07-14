// @flow
import BasePage from '../BasePage'
import ModalConfirmation from '@page-objects/ModalConfirmatioPage'
import DispatchBulkUpload from './BulkUploadPage'
import WorkMarket from './WorkMarketPage'

const modalconfirmation = new ModalConfirmation()
const ADD_NEW_DISPATCH = '#btnAddTicket'
const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'
const DISPTCH_OVERVIEW_TAB = '//a[text()="Overview"]'
const DISPTCH_LOCATION_TAB = '//a[text()="Location"]'
const DISPTCH_AUDIT_TAB = '//a[text()="Audit"]'
const DISPTCH_ACTIVITY_TAB = '//a[text()="Activity"]'
const DISPTCH_FINANCIALS_TAB = '//a[text()="Financials"]'
const DISPTCH_NOTES_TAB = '//a[text()="Notes"]'
const DISPTCH_ASSIGNMENTS_TAB = '//a[text()="Assignments"]'
const DISPTCH_DOCUMENTS_TAB = '//a[text()="Documents"]'
const DISPTCH_DELIVERABLES_TAB = '//a[text()="Deliverables"]'
const DISPTCH_VENDORS_TAB = '(//a[text()="Vendors"])[2]'
const DISPTCH_REVIEW_TAB = '//a[text()="Review"]'
const DISPTCH_SUPPORT_TAB = '//a[text()="Support"]'
const DISPATCH_SEARCH_FIELD = '//input[contains(@id,"tbSearch")]'
const ADD_TICKET_DETAILS = '#proforma > div.sort-content > a'
const LINE_ITEM_TECH_LABEL = '//*[@name="TechnicianLevel"]'
const LINE_ITEM_EXPENSE_TYPE = '//*[@name="ExpenseType"]'
const LINE_ITEM_MATERIAL_DETAILS = '#MaterialDetail'
const SAVE_LINE_ITEM = '//*[@type="button"  and @value= "Save"]'
const FINANCIALS_DATA_TABLE = '#dataTable'
const DELETE_LINE_ITEM = '(//*[@class="fa fa-trash-o"])[last()]'
const LINE_ITEM = '//*[@class="job-financial-line-item-row"]'
const EXPENSE_TYPE = '((//*[@class= "job-financial-line-item-row"])[last()]//following-sibling::td )[1]'
const ADD_NEW_TICKET = '#btnAddTicket'
const CLIENT_OPTION_DROPDOWN = '#ClientID'
const CLIENT_PO = '#ClientPO_'
const CLIENT_WO = '#ClientProvidedWorkOrder_'
const END_CLIENT_OPTION_DROPDOWN = '#EndClientID'
const CLIENT_CONTACT_OPTION_DROPDOWN = '#ClientTicketInitiator'
const CLIENT_COUNTRY = '#CountryId'
const CLIENT_LOCATION_NAME = '#ClientSiteID'
const DISPATCH_ISSUES = '#Issue'
const DISPATCH_SCOPE_WORKER = '#ScopeOfWork_ifr'
const DISPATCH_PROBLEM_CODE = '#ProblemCodeId'
const DISPATCH_TECH_LEVEL = '#TechnicianTypeId'
const DISPATCH_NUMBER_OF_TECH_NEEDED = '#NumberOfTechs'
const DISPATCH_RESPONSE_CATEGORY = '#KinettixResponseCategoryId'
const DISPATCH_REQUIRED_TOOL = '#TicketRequiredTools_ifr'
const DISPATCH_SAVE_BUTTON = '(//button [contains (text (),"Save")])[1]'
const DISPATCH_ADD_TECH_GROUP_BUTTON = '#addTechTypeGroup'
const DISPATCH_NSN_FIELD = '//input[@id="CustomFields.Fields[0].Value"]'
const DISPATCH_SIDEBAR_MENU = '//*[@id="sidebar-menu"]'
const BILLING_ANALYST = '//*[@class="ticket-id" and text()="Project Manager:"]'
const ASSIGNED_VENDOR_BUTTON = '//*[@class="btn select-vendor" and text()="Assign Vendor"]'
const VENDORS_LIST = '#vendor-filterlist'
const CREATE_ASSIGNMENT_BUTTON = '//*[text()="Create Assignment" and @onclick="AssignWorkMarketVendor(this);"]'

export default class Dispatch extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(ADD_NEW_DISPATCH)
    await this.waitForDisplayed(DISPATCH_SIDEBAR_MENU)
  }

  async tapDispatchOverview () {
    await this.click(DISPTCH_OVERVIEW_TAB)
  }
  async tapDispatchLocation () {
    await this.click(DISPTCH_LOCATION_TAB)
  }
  async tapDispacthAudit () {
    await this.click(DISPTCH_AUDIT_TAB)
  }
  async tapDispatchActivity () {
    await this.click(DISPTCH_ACTIVITY_TAB)
  }

  async tapDispatchFinancials () {
    await this.click(DISPTCH_FINANCIALS_TAB)
  }

  async tapDispatchNotes () {
    await this.click(DISPTCH_NOTES_TAB)
  }

  async tapDispatchAssignments () {
    await this.click(DISPTCH_ASSIGNMENTS_TAB)
  }

  async tapDispatchDocuments () {
    await this.click(DISPTCH_DOCUMENTS_TAB)
  }

  async tapDispatchDeliverables () {
    await this.click(DISPTCH_DELIVERABLES_TAB)
  }

  async tapDispatchVendors () {
    await this.click(DISPTCH_VENDORS_TAB)
  }

  async tapDispatchReview () {
    await this.click(DISPTCH_REVIEW_TAB)
  }

  async tapDispatchSupports () {
    await this.click(DISPTCH_SUPPORT_TAB)
  }

  async tapAddNewTicketButton () {
    await this.click(ADD_NEW_TICKET)
  }

  async tapAssignedVendorButton () {
    await this.click(ASSIGNED_VENDOR_BUTTON)
    await this.waitForDisplayed(VENDORS_LIST)
  }

  async tapCreateAssignmentButton () {
    await this.scrollElementIntoView('//*[text()="Work Market"]')
    await this.click(CREATE_ASSIGNMENT_BUTTON)
  }

  async searchDispatch (dispatchNumber: string) {
    await this.click(DISPATCH_SEARCH_FIELD)
    await this.sendKeys(DISPATCH_SEARCH_FIELD, dispatchNumber)
    await browser.keys('Enter')
  }

  async tapAddNewLineItems () {
    await this.click(ADD_TICKET_DETAILS)
  }

  async selectLineItem (item: string) {
    await this.selectDropDownByText(LINE_ITEM_EXPENSE_TYPE, item)
  }

  async selectFirstTechOnLineItem (index: number = 0) {
    await this.selectDropDownByIndex(LINE_ITEM_TECH_LABEL, index)
  }

  async selectTechOnLineItemByTechName (techName: string) {
    await this.selectDropDownByText(LINE_ITEM_TECH_LABEL, techName) // ((//*[@class= "job-financial-line-item-row"])[2]//following-sibling::td )[1]
  }

  async selectClient (clientName: string | string[]) {
    const client = process.env.TEST_ENVIRONMENT === 'qa' ? clientName[0] : clientName[1]
    await this.selectDropDownByText(CLIENT_OPTION_DROPDOWN, client)
    await this.sleep(5000)
  }

  async selectEndClient (endclient: string | string[]) {
    const client = process.env.TEST_ENVIRONMENT === 'qa' ? endclient[0] : endclient[1]
    await this.sleep(5000)
    await this.selectDropDownByText(END_CLIENT_OPTION_DROPDOWN, client)
    await this.sleep(5000)
  }

  async selectClientContact (contact: string | string[]) {
    const client = process.env.TEST_ENVIRONMENT === 'qa' ? contact[0] : contact[1]
    await this.selectDropDownByText(CLIENT_CONTACT_OPTION_DROPDOWN, client)
    await this.sleep(5000)
  }

  async selectClientCountry (country: string) {
    await this.selectDropDownByText(CLIENT_COUNTRY, country)
    await this.sleep(5000)
  }

  async selectClienLocation (location: string | string[]) {
    const client = process.env.TEST_ENVIRONMENT === 'qa' ? location[0] : location[1]
    await this.selectDropDownByText(CLIENT_LOCATION_NAME, client)
    await this.sleep(3000)
  }

  async selectDispatchProblemCode (problemCode: string = 'Connectivity') {
    await this.selectDropDownByText(DISPATCH_PROBLEM_CODE, problemCode)
    await this.sleep(3000)
  }

  async selectDispatchTechLevel (techlevel: string = 'Field Tech') {
    await this.selectDropDownByText(DISPATCH_TECH_LEVEL, techlevel)
    await this.sleep(3000)
  }

  async selectDispatchTechNeed (techNeeded: number = 2) {
    await this.selectDropDownByText(DISPATCH_NUMBER_OF_TECH_NEEDED, techNeeded)
    await this.sleep(3000)
  }

  async selectDispatchCategotyCode (categoryCode: string = 'Standard 2 Day') {
    await this.scrollElementIntoView(DISPATCH_RESPONSE_CATEGORY)
    await this.selectDropDownByText(DISPATCH_RESPONSE_CATEGORY, categoryCode)
    await this.sleep(3000)
  }
  async tapSaveLineItem () {
    await this.click(SAVE_LINE_ITEM)
  }

  async isSaveLineItemSucessful () {
    const isSuccess = await this.isDisplayedWithin(FINANCIALS_DATA_TABLE, 7000)
    return isSuccess
  }

  async getNumberOfLineItems () {
    await this.waitForDisplayed(FINANCIALS_DATA_TABLE)
    return (await driver.$$(LINE_ITEM)).length
  }

  async addMaterialDetails (details: string) {
    await this.sendKeys(LINE_ITEM_MATERIAL_DETAILS, details)
  }

  async addNSNDetails (details: string = '5323443') {
    await this.sendKeys(DISPATCH_NSN_FIELD, details)
  }

  async addClientPO (PO: number = 442343444) {
    await this.sendKeys(CLIENT_PO, PO)
  }

  async addClientWO (PO: number = 8899566) {
    await this.sendKeys(CLIENT_WO, PO)
  }

  async addDispatchIssue (issue: string = 'This is just a test issue-automated') {
    await this.scrollElementIntoView(DISPATCH_ISSUES)
    await this.sendKeys(DISPATCH_ISSUES, issue)
  }

  async addDispatchScoreOfWord (scopeWork: string = 'This is just a test issue-automated') {
    await this.switchToElementFrame(DISPATCH_SCOPE_WORKER)
    await this.sendKeys('#tinymce', scopeWork)
    await this.switchToDefaultFrame()
  }

  async addDispatchRequiredTool (requiredtool: string = 'This is just a test issue-automated') {
    await this.scrollElementIntoView(DISPATCH_REQUIRED_TOOL)
    await this.switchToElementFrame(DISPATCH_REQUIRED_TOOL)
    await this.sendKeys('#tinymce', requiredtool)
    await this.switchToDefaultFrame()
  }

  async tapDispatchSaveButton () {
    await this.scrollElementIntoView(DISPATCH_SAVE_BUTTON)
    await this.click(DISPATCH_SAVE_BUTTON)
  }

  async tapDispatchAddTecheButton () {
    await this.click(DISPATCH_ADD_TECH_GROUP_BUTTON)
  }

  async deleteLineItemLastEntry () {
    await this.click(DELETE_LINE_ITEM)
    await modalconfirmation.isLoaded()
    await modalconfirmation.tapConfirmButton()
  }

  async getLastExpenseType () {
    const expenseType = await this.getText(EXPENSE_TYPE)
    return expenseType
  }

  async isSomethingWentWrong () {
    const somethingWentWrong = await this.locatorFound(SOMETHING_WENT_WRONG)
    return somethingWentWrong
  }

  get bulkUploadSteps () {
    return new DispatchBulkUpload()
  }

  get WorkMarketAssignment () {
    return new WorkMarket()
  }
}
