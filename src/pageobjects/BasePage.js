/* eslint-disable no-console */
// @flow

import CommonUtils from '/src/lib/CommonUtils'
import allureReporter from '@wdio/allure-reporter'

export default class BasePage {
  /**
     * Function that wait until locator is located and web element is visible
     * return true if element is visible. Waits for element to be displayed
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<boolean>}
    */
  async waitForDisplayed (locator: string, retries: number = 1): Promise<boolean> {
    try {
      const element = $(locator)
      await element.waitForDisplayed()
      return element.isDisplayed()
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed waiting for element ${locator} to be displayed`, undefined, 'failed')
        throw new Error(`Element ${locator} is not displayed after maximum retries, Error message: ${err.message.toString()}`)
      }
    }
    return this.waitForDisplayed(locator, retries - 1)
  }

  /**
     * Function to wait until locator is located
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<WebdriverIO.Element>}
    */
  async waitForExist (locator: string, retries: number = 1): Promise<WebdriverIO.Element> {
    try {
      const element = await $(locator)
      await element.waitForExist()
      return element
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed waiting for element ${locator} to exist`, undefined, 'failed')
        throw new Error(`Element ${locator} does not exist after maximum retries, Error message: ${err.message.toString()}`)
      }
    }
    return this.waitForExist(locator, retries - 1)
  }

  /**
     * Function to wait until locator is located and web element is not visible
     * @param {string} locator
     * @param {string} errmsg - error message to be shown in case of failure
     * @param {number} retries
     * @returns {Promise<void>}
    */
  async waitForNotDisplayed (locator: string, errmsg: string, retries: number = 1): Promise<void> {
    try {
      const element = await $(locator)
      await element.waitForDisplayed({ reverse: true, timeoutMsg: errmsg })
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed waiting for element ${locator} to be Not Displayed`, {content: errmsg, name: 'Error'}, 'failed')
        throw new Error(`Element ${locator} is still displayed after maximum retries. Error message: ${err.message.toString()}`)
      }
      await this.waitForNotDisplayed(locator, errmsg, retries - 1)
    }
  }

  /**
     * Function to check if element is displayed within certain time
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<boolean>}
    */
  async isDisplayedWithin (locator: string, timeout: number): Promise<boolean> {
    try {
      const element = await $(locator)
      await element.waitForDisplayed({timeout})
      return true
    } catch (e) {
      return false
    }
  }

  /**
     * Function to check if element exists within certain time
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<WebdriverIO.Element>}
    */
  async isExistingWithin (locator: string, timeout: number): Promise<boolean> {
    try {
      const element = await $(locator)
      await element.waitForExist({timeout})
      return true
    } catch (e) {
      return false
    }
  }

  /**
     * Function to check if locator is enabled
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<WebdriverIO.Element>}
    */
  async isElementEnabled (locator: string, retries: number = 1): Promise<boolean> {
    try {
      const element = await $(locator)
      return element.isEnabled()
    } catch (err) {
      if (retries === 0) {
        return false
      }
      return this.isElementEnabled(locator, retries - 1)
    }
  }

  /**
     * Function to wait for element to be enabled
     * @param {string} locator
     * @param {number} retries
     * @param {boolean} reverse - If reverse = true will wait for element to be Disabled
     * @returns {Promise<void>}
    */
  async waitForEnabled (locator: string, retries: number = 1, reverse = false): Promise<void> {
    try {
      const element = await $(locator)
      await element.waitForEnabled({reverse})
    } catch (err) {
      if (retries === 0) {
        const expectedState = reverse ? 'disabled' : 'enabled'
        allureReporter.addStep(`Failed waiting for element ${locator} to be ${expectedState}`, undefined, 'failed')
        throw new Error(`Error waiting for element ${locator} to be ${expectedState}`)
      }
      return this.waitForEnabled(locator, retries - 1, reverse)
    }
  }

  /**
     * Function for locator is found
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<boolean>}
    */
  async locatorFound (locator: string, retries: number = 1): Promise<boolean> {
    try {
      const element = await $(locator)
      await element.waitForExist()
      return true
    } catch (err) {
      if (retries === 0) {
        return false
      }
      return this.locatorFound(locator, retries - 1)
    }
  }

  /**
     * Function to wait for element to not exist
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<boolean>}
    */
  async locatorNotFound (locator: string, retries: number = 1): Promise<boolean> {
    try {
      const element = await $(locator)
      await element.waitForExist({ reverse: true })
      return true
    } catch (err) {
      if (retries === 0) {
        return false
      }
      return this.locatorNotFound(locator, retries - 1)
    }
  }

  /**
     * Function to get current page title as string
     * @param {number} retries
     * @returns {Promise<string>}
    */
  async getCurrentPageTitle (retries: number = 1): Promise<string> {
    try {
      const title = await browser.getTitle()
      allureReporter.addStep(`Page title: "${title}"`, undefined, 'passed')
      return title
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed to get page title`, undefined, 'failed')
        throw new Error(`Unable to get page title after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(`Skipped getting page title`, undefined, 'skipped')
      return this.getCurrentPageTitle(retries - 1)
    }
  }

  /**
     * Function to get current page url as string
     * @param {number} retries
     * @returns {Promise<string>}
    */
  async getCurrentPageUrl (retries: number = 1): Promise<string> {
    try {
      const url = await browser.getUrl()
      allureReporter.addStep(`URL: "${url}"`, undefined, 'passed')
      return url
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Unable to get page URL`, undefined, 'failed')
        throw new Error(`Unable to get page URL after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(`Skipped getting page URL`, undefined, 'skipped')
      await this.sleep(250)
      return this.getCurrentPageUrl(retries - 1)
    }
  }

  /**
     * Function to send values to text box using defined locator
     * @param {string} locator
     * @param {string} keys
     * @param {number} retries
     * @returns {Promise<void>}
    */
  async sendKeys (locator: string, keys: string, retries: number = 2): Promise<void> {
    allureReporter.startStep(`Type text: "${keys}" into element: "${locator}"`)
    try {
      const element = await $(locator)
      await element.click()
      await element.clearValue()
      await element.setValue(keys)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Unable to send keys to ${locator} after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(1000)
      return this.sendKeys(locator, keys, retries - 1)
    }
  }

  /**
     * Function to send values to text box using defined index of elements based on locator
     * @param {string} locator
     * @param {string} keys
     * @param {number} index
     * @param {number} retries
     * @returns {Promise<void>}
    */
  async sendKeysByIndex (locator: string, keys: string, index: number, retries: number = 1): Promise<void> {
    try {
      allureReporter.startStep(`Typing text: "${keys}" to element: "${locator}" with index ${index}`)
      const elementList = await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      await elementList[index].click()
      await elementList[index].clearValue()
      await elementList[index].setValue(keys)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Unable to send keys to ${locator} with index ${index} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.sendKeysByIndex(locator, keys, index, retries - 1)
    }
  }

  /**
     * Function to get text using defined locator
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<string>}
    */
  async getText (locator: string, retries: number = 1): Promise<string> {
    const stepName = `Get text from element:\n "${locator}"`
    try {
      const element = await this.waitForExist(locator)
      const text = await element.getText()
      allureReporter.addStep(stepName, {type: 'text/plain', name: 'text', content: text}, 'passed')
      return text
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, undefined, 'failed')
        throw new Error(`Unable to get ${locator} text after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(stepName, undefined, 'skipped')
      await this.sleep(250)
      return this.getText(locator, retries - 1)
    }
  }

  /**
     * Function get text using index number from arrays of locator
     * @param {string} locator
     * @param {number} index
     * @param {number} retries
     * @returns {Promise<string>}
    */
  async getTextByIndex (locator: string, index: number, retries: number = 1): Promise<string> {
    const stepName = `Get text from element:\n "${locator}" with index ${index}`
    try {
      await browser.waitUntil(() => $$(locator)[index].isExisting(), {timeout: 10000})
      const text = await $$(locator)[index].getText()
      allureReporter.addStep(stepName, {type: 'text/plain', name: 'text', content: text}, 'passed')
      return text
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, undefined, 'failed')
        throw new Error(`Unable to get ${locator} text after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(stepName, undefined, 'skipped')
      await this.sleep(250)
      return this.getTextByIndex(locator, index, retries - 1)
    }
  }

  /**
     * Function to wait until number of elements is >= expectedNumberOfElements. Returns elements Array after waiting
     * @param {string} locator
     * @param expectedNumberOfElements
     * @returns {Promise<WebdriverIO.ElementArray>}
    */
  async waitUntilNumberOfElementsIsAtLeast (locator: string, expectedNumberOfElements: number) {
    const getElements = () => $$(locator)
    await browser.waitUntil(async () => {
      const elements = await getElements()
      return elements.length >= expectedNumberOfElements
    }, {timeoutMsg: `Timeout waiting for number of elements with locator: ${locator} to be at least ${expectedNumberOfElements}.\n Actual number of elements: ${(await getElements()).length}`})
    return getElements()
  }

  /**
     * Function to get web element attributes value using locator
     * @param {string} locator
     * @param attribute - attributes to extract value of
     * @param {number} retries
     * @returns {Promise<string>}
    */
  async getAttributesValue (locator: string, attribute: string, retries: number = 1): Promise<string> {
    const stepName = `Get "${attribute}" attribute from element:\n "${locator}"`
    try {
      const element = await this.waitForExist(locator)
      const attributeValue = await element.getAttribute(attribute)
      allureReporter.addStep(stepName, {type: 'text/plain', name: 'attribute value', content: attributeValue}, 'passed')
      return attributeValue
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, undefined, 'failed')
        throw new Error(`Unable to get ${locator} attributes value after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(stepName, undefined, 'skipped')
      await this.sleep(250)
      return this.getAttributesValue(locator, attribute, retries - 1)
    }
  }

  /**
     * Function to get web element attributes value using locator with index
     * @param {string} locator
     * @param attribute - attributes to extract value of
     * @param index
     * @param {number} retries
     * @returns {Promise<string>}
     */
  async getAttributesValueByIndex (locator: string, attribute: string, index: number, retries: number = 1): Promise<string> {
    const stepName = `Get "${attribute}" attribute from element:\n "${locator}" with index ${index}`
    try {
      await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      const elements = await $$(locator)
      const attributeValue = await elements[index].getAttribute(attribute)
      allureReporter.addStep(stepName, {type: 'text/plain', name: 'value', content: attributeValue}, 'passed')
      return attributeValue
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, undefined, 'failed')
        throw new Error(`Unable to get ${locator} attributes value after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(stepName, undefined, 'skipped')
      await this.sleep(250)
      return this.getAttributesValueByIndex(locator, attribute, index, retries - 1)
    }
  }

  /**
     * Function to get the value of a <textarea>, <select> or text <input> found by given selector with index
     * @param {string} locator
     * @param index
     * @param {number} retries
     * @returns {Promise<string>}
     */
  async getValueByIndex (locator: string, index: number, retries: number = 1): Promise<string> {
    const stepName = `Get value from element:\n "${locator}" with index ${index}`
    try {
      await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      const elements = await $$(locator)
      const value = await elements[index].getValue()
      allureReporter.addStep(stepName, {type: 'text/plain', name: 'value', content: value}, 'passed')
      return value
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, undefined, 'failed')
        throw new Error(`Unable to get value of ${locator} with index ${index} after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(stepName, undefined, 'skipped')
      await this.sleep(250)
      return this.getValueByIndex(locator, index, retries - 1)
    }
  }

  /**
     * Function to check for presence of element's attribute
     * @param {string} locator
     * @param attribute - attributes to extract value of
     * @param {number} retries
     * @returns {Promise<boolean>}
     */
  async hasAttributePresent (locator: string, attribute: string, retries: number = 0): Promise<boolean> {
    await this.waitForExist(locator)
    const stepName = (isPresent) => `Element:\n "${locator}" has ${isPresent ? '' : 'no '}attribute: "${attribute}"`
    try {
      await this.waitForElementToHaveAttribute(locator, attribute, false, 7000)
      allureReporter.addStep(stepName(true), undefined, 'passed')
      return true
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName(false), undefined, 'passed')
        return false
      }
      allureReporter.addStep(stepName(false), undefined, 'skipped')
      await this.sleep(250)
      return this.hasAttributePresent(locator, attribute, retries - 1)
    }
  }

  /**
     * Function to wait for element to have attribute or waiting for element to not have this attribute
     * @param {string} locator
     * @param attribute - name of the attribute of the given element
     * @param reverse - if true will wait for element to not contain specified attribute
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async waitForElementToHaveAttribute (locator: string, attribute: string, reverse = false, timeout: number = 15000): Promise<void> {
    const element = await this.waitForExist(locator)
    await browser.waitUntil(
      async () => {
        const attributeValue = await element.getAttribute(attribute)
        return reverse ? attributeValue === null : attributeValue !== null
      },
      {
        timeout: timeout,
        timeoutMsg: `Timeout ${timeout} ms waiting for element ${locator} to ${reverse ? 'not ' : ''}have attribute "${attribute}"`
      }
    )
  }

  /**
     * Function to click on web element using defined locator
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async click (locator: string, retries: number = 3): Promise<void> {
    allureReporter.startStep(`Click element "${locator}"`)
    try {
      // await this.waitForPageToBeLoaded()
      const element = await $(locator)
      await element.click()
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to click ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.click(locator, retries - 1)
    }
  }

  /**
     * Function to double click on web element using defined locator
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async doubleClick (locator: string, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Double click element "${locator}"`)
    try {
      const element = await $(locator)
      await element.doubleClick()
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to double click ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.doubleClick(locator, retries - 1)
    }
  }

  /**
     * Function to click on web element using index number from array of locators
     * @param {string} locator
     * @param index
     * @param {number} retries
     * @returns {Promise<boolean>}
     */
  async clickByIndex (locator: string, index: number, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Double click element "${locator}"`)
    try {
      const elements = await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      await elements[index].click()
      allureReporter.endStep('passed')
      return true
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to click ${locator} with index ${index} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.clickByIndex(locator, index, retries - 1)
    }
  }

  /**
     * Function to click on web element using visible text from arrays of locators
     * @param {string} locator
     * @param {string} keys
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async clickByText (locator: string, keys: string, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Click by text "${keys}" on element "${locator}"`)
    try {
      await this.waitForDisplayed(locator)
      const elementList = await $$(locator)
      for (let element of elementList) {
        const option = await element.getText()
        if (option === keys) {
          await element.click()
        }
      }
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to click ${locator} by text ${keys} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.clickByText(locator, keys, retries - 1)
    }
  }

  /**
     * Function to move mouse to defined web elements using locator
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async moveToLocatorPosition (locator: string, retries: number = 3): Promise<void> {
    await this.waitForPageToBeLoaded()
    try {
      let element = await this.waitForExist(locator)
      await element.scrollIntoView()
      await element.moveTo()
      await this.sleep(500)
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed to move mouse to ${locator}`, undefined, 'failed')
        throw new Error(`Still not able to move to ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      await this.sleep(250)
      return this.moveToLocatorPosition(locator, retries - 1)
    }
  }

  /**
     * Function to move mouse to defined web elements using locator
     * @param {string} locator
     * @param index
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async moveToLocatorPositionByIndex (locator: string, index: number, retries: number = 3): Promise<void> {
    try {
      const elements = await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      const element = elements[index]
      await element.scrollIntoView()
      await element.moveTo()
      await this.sleep(500)
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed to move mouse to ${locator} with index ${index}`, undefined, 'failed')
        throw new Error(`Still not able to move to ${locator} with index ${index} after maximum retries, Error message: ${err.message.toString()}`)
      }
      await this.sleep(250)
      return this.moveToLocatorPositionByIndex(locator, index, retries - 1)
    }
  }

  /**
     * Function to move mouse to defined web elements using locator and clicking
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async moveToLocatorPositionAndClick (locator: string, retries: number = 3): Promise<void> {
    allureReporter.startStep(`Move mouse and click element "${locator}"`)
    try {
      let element = await $(locator)
      await element.waitForExist()
      await element.scrollIntoView()
      await element.moveTo()
      await this.sleep(500)
      await element.click()
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to move to and click ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.moveToLocatorPositionAndClick(locator, retries - 1)
    }
  }

  /**
     * Function to move mouse to defined web elements using locator and clicking
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async moveToLocatorPositionAndDoubleClick (locator: string, retries: number = 3): Promise<void> {
    allureReporter.startStep(`Move mouse and double click element "${locator}"`)
    try {
      let element = await $(locator)
      await element.moveTo()
      await element.doubleClick()
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to move to ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.moveToLocatorPositionAndDoubleClick(locator, retries - 1)
    }
  }

  /**
     * Function to move mouse to defined web elements using locator and clicking
     * @param {string} locator
     * @param index
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async moveToLocatorPositionAndClickByIndex (locator: string, index: number, retries: number = 3): Promise<void> {
    allureReporter.startStep(`Move mouse and click element "${locator}" with index ${index}`)
    try {
      await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      await this.scrollElementIntoViewByIndex(locator, index)
      await this.clickByIndex(locator, index)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to move to ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.moveToLocatorPositionAndClickByIndex(locator, index, retries - 1)
    }
  }

  /**
     * Function to select visible text from dropdown list using locator
     * @param {string} locator
     * @param key
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async selectDropDownByText (locator: string, key: string, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Select text "${key}" from dropdown element "${locator}"`)
    try {
      const selectList = await $(locator)
      await selectList.selectByVisibleText(key)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to select ${locator} with key ${key} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.selectDropDownByText(locator, key, retries - 1)
    }
  }

  /**
     * Function to select text from dropdown list using locator and attribute value (e.g. "value=AK")
     * @param {string} locator
     * @param key
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async selectDropDownByAttributeValue (locator: string, attribute: string, value: string, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Select by "${attribute}=${value}" from dropdown element "${locator}"`)
    try {
      const selectList = await $(locator)
      await selectList.selectByAttribute(attribute, value)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to select ${locator} with attribute: ${attribute}=${value} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.selectDropDownByAttributeValue(locator, attribute, value, retries - 1)
    }
  }

  /**
     * Function to select text from dropdown list using locator and attribute value (e.g. "value=AK")
     * @param {string} locator
     * @param key
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async selectDropDownByIndex (locator: string, index: number, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Select by "${index}" from dropdown element "${locator}"`)
    try {
      const selectList = await $(locator)
      await selectList.selectByIndex(index)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to select ${locator} with attribute: ${index} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.selectDropDownByIndex(locator, index, retries - 1)
    }
  }

  /**
     * Function to send search values to text box using defined locator and pressing ENTER Key
     * @param {string} locator
     * @param {string} keys
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async searchKeys (locator: string, keys: string, retries: number = 1): Promise<void> {
    allureReporter.startStep(`Type "${keys}" and press ENTER into element "${locator}"`)
    try {
      const element = await $(locator)
      await element.click()
      await element.clearValue()
      await element.sendKeys(keys)
      await browser.keys('Enter')
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Unable to send keys to ${locator} after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.searchKeys(locator, keys, retries - 1)
    }
  }

  /**
     * Function to return array of elements based on locator
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<WebdriverIO.ElementArray>}
     */
  async getElementsArray (locator: string, retries: number = 3): Promise<WebDriverElement[]> {
    allureReporter.startStep(`Get elements array "${locator}"`)
    try {
      const elements = await this.waitUntilNumberOfElementsIsAtLeast(locator, 1)
      allureReporter.endStep('passed')
      return elements
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('passed')
        return []
      }
    }
    allureReporter.endStep('skipped')
    await this.sleep(250)
    return this.getElementsArray(locator, retries - 1)
  }

  /**
     * Function to get length of the elements array
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<number>}
     */
  async getCountOfArrayList (locator: string, retries: number = 1): Promise<number> {
    try {
      const numberOfElements = await $$(locator).length
      allureReporter.addStep(`Number of elements: ${numberOfElements}. Locator: ${locator}`)
      return numberOfElements
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Number of elements: 0. Locator: ${locator}`)
        throw new Error(`Unable to get ${locator} count after maximum retries, Error message: ${err.message}`)
      }
      await this.sleep(250)
      return this.getCountOfArrayList(locator, retries - 1)
    }
  }

  async getElementsTextArrayList (locator: string, retries: number = 1): Promise<any> {
    const stepName = `Get text array from elements: "${locator}"`
    await this.waitForPageToBeLoaded()
    try {
      await this.waitForExist(locator)
      const elements = await $$(locator)
      const elementsTextArray = []
      for (const element of elements) {
        const text = await element.getText()
        elementsTextArray.push(text.trim())
      }
      allureReporter.addStep(stepName, {content: elementsTextArray.join('\n'), name: 'elements text', type: 'text/plain'}, 'passed')
      return elementsTextArray
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, {content: '', name: 'elements text', type: 'text/plain'}, 'passed')
        return []
      }
      allureReporter.addStep(stepName, undefined, 'skipped')
      await this.sleep(250)
      return this.getElementsTextArrayList(locator, retries - 1)
    }
  }

  async getElementsAttributeValueArrayList (locator: string, attribute: string, retries: number = 1): Promise<any> {
    const stepName = `Get "${attribute}" attribute values from elements: "${locator}"`
    try {
      const elements = await this.waitUntilNumberOfElementsIsAtLeast(locator, 1)
      const elementsAttributesArrayList = []
      for (const element of elements) {
        elementsAttributesArrayList.push(await element.getAttribute(attribute))
      }
      allureReporter.addStep(stepName, {content: elementsAttributesArrayList.join('\n'), name: `elements' "${attribute}" attribute values`, type: 'text/plain'}, 'passed')
      return elementsAttributesArrayList
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(stepName, {content: '', name: `elements' "${attribute}" attribute values`, type: 'text/plain'}, 'failed')
        throw new Error(`Unable to get "${attribute}" attribute values list from elements with locator ${locator}  after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(stepName, {content: '', name: `elements' "${attribute}" attribute values`, type: 'text/plain'}, 'skipped')
      await this.sleep(250)
      return this.getElementsAttributeValueArrayList(locator, attribute, retries - 1)
    }
  }

  getExistingEmailId () {
    const stepName = `Get existing email`
    try {
      let fs = require('fs')
      let path = process.cwd()
      let buffer = fs.readFileSync(path + '/write.txt')
      const text = buffer.toString()
      allureReporter.addStep(stepName, {content: text, name: 'email', type: 'text/plain'}, 'passed')
      return text
    } catch (err) {
      allureReporter.addStep(stepName, {content: err.toString(), name: 'error', type: 'text/plain'}, 'failed')
      throw new Error(`${err.message}`)
    }
  }

  StoreEmailID (email) {
    let fs = require('fs')
    fs.writeFileSync('write.txt', email)
    allureReporter.addStep(`Store email`, {content: email, name: 'email'}, 'passed')
  }

  async switchToFrameByIndex (data: string) {
    allureReporter.startStep(`Switch to frame "${data}"`)
    const num = parseInt(data)
    try {
      await browser.switchToFrame(num)
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to switch to frame with index ${num}, Error message: ${err.message}`)
    }
  }

  async switchToDefaultFrame () {
    allureReporter.startStep(`Switch to parent frame`)
    try {
      await browser.switchToParentFrame()
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to switch to parent frame, Error message: ${err.message}`)
    }
  }

  /**
     * Function to switch to frame by locator
     * @param {string} locator
     * @returns {Promise<void>}
     */
  async switchToElementFrame (locator: string): Promise<any> {
    allureReporter.startStep(`Switch to frame ${locator}`)
    try {
      const element = await $(locator)
      await browser.switchToFrame(element)
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to locate an iframe element , Error message: ${err.message}`)
    }
    return this.switchToElementFrame
  }

  async selectDatePicker (dobFieldActivator: string, dayLocator: string, monthLocator: string, yearLocator: string, dob: any, retries: number = 1): Promise<void> {
    const args = `dobFieldActivator=${dobFieldActivator}\ndayLocator=${dayLocator}\nmonthLocator=${monthLocator}\nyearLocator${yearLocator}\ndob=${dob}`
    try {
      await this.click(dobFieldActivator)
      let day = await CommonUtils.getDayFromDate(dob)
      let month = await CommonUtils.getMonthFromDate(dob)
      let year = await CommonUtils.getYearFromDate(dob)
      await this.click(yearLocator)
      await this.selectDropDownByText(yearLocator, year)
      await this.click(monthLocator)
      await this.selectDropDownByText(monthLocator, month)

      await this.clickByText(dayLocator, day)
      allureReporter.addStep('Select date from date picker', {type: 'text/plain', name: 'Arguments', content: args}, 'passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep('Select date from date picker', {type: 'text/plain', name: 'Arguments', content: args}, 'failed')
        throw new Error(`Unable to select date after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep('Select date from date picker', {type: 'text/plain', name: 'Arguments', content: args}, 'skipped')
      await this.selectDatePicker(dobFieldActivator, dayLocator, monthLocator, yearLocator, dob, retries - 1)
    }
  }

  async scrollElementIntoViewByIndex (locator: string, index: number, retries: number = 3): Promise<void> {
    try {
      let elements = await this.waitUntilNumberOfElementsIsAtLeast(locator, index + 1)
      const element = elements[index]
      await element.scrollIntoView()
    } catch (err) {
      if (retries === 0) {
        throw new Error(`Still not able to move to ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      await this.sleep(250)
      return this.scrollElementIntoViewByIndex(locator, index, retries - 1)
    }
  }

  async scrollElementIntoView (locator: string, retries: number = 3): Promise<void> {
    try {
      await $(locator).scrollIntoView({ block: 'center', inline: 'nearest' })
    } catch (err) {
      if (retries === 0) {
        throw new Error(`Still not able to move to ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      await this.sleep(250)
      return this.scrollElementIntoView(locator, retries - 1)
    }
  }
  /**
     * Function to wait for spinner to disappear.
     * @param {string} locator
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async waitForSpinnerToDisappear (locator: string, retries: number = 4): Promise<void> {
    allureReporter.startStep(`Wait for spinner to disappear "${locator}"`)
    try {
      const timeout = 10000
      // wait for spinner to appear before waiting for disappear
      const spinnerAppearTimeout = 5000
      const element = await $(locator)
      const isSpinnerExist = await this.isExistingWithin(locator, spinnerAppearTimeout)
      if (isSpinnerExist) {
        await element.waitForDisplayed({reverse: true, timeout: (timeout * retries)})
      }
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Spinner still visible ${locator} after maximum retries, Error message: ${err.message.toString()}`)
    }
  }

  async openUrlInNewTab (url: any): Promise<void> {
    allureReporter.startStep(`Open URL in new tab: "${url}"`)
    try {
      await browser.newWindow(url)
      await this.waitForPageToBeLoaded()
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to Open URL in new tab, Error message: ${err.message}`)
    }
  }

  async openURLInMoreThan2Tabs (url: any, totalTabs: number): Promise<void> {
    allureReporter.startStep(`Open URL in more than 2 tabs: ${url}`)
    try {
      for (let i = 1; i <= totalTabs; i++) {
        if (i % 2 === 0) {
          await browser.newWindow(url)
        } else {
          await browser.execute((url) => {
            window.open(url)
          }, url)
        }
      }
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to Open URL in new tab, Error message: ${err.message}`)
    }
  }

  async switchBrowserTab (tabIndex: number) {
    allureReporter.startStep(`Switch to tab "${tabIndex}"`)
    try {
      let tabs = []
      tabs = await browser.getWindowHandles()
      await browser.switchToWindow(tabs[tabIndex].toString())
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to switch tab, Error message: ${err.message}`)
    }
  }

  async openURLInNewWindow (url: string, options) {
    allureReporter.startStep(`Open URL in new window: "${url}"`)
    try {
      await browser.newWindow(url, options)
      await this.waitForPageToBeLoaded()
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to open URL in new tab, Error message: ${err.message}`)
    }
  }

  async isSelected (locator: string, retries: number = 1): Promise<boolean> {
    const element = await this.waitForExist(locator)
    try {
      const isSelected = element.isSelected()
      allureReporter.addStep(`Is element "${locator}" selected = ${isSelected}`, undefined, 'passed')
      return isSelected
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed to check if element "${locator}" is selected`, undefined, 'failed')
        return element.isSelected()
      }
      allureReporter.addStep(`Skipped check if element "${locator}" is selected`, undefined, 'skipped')
      await this.sleep(250)
      return this.isSelected(locator, retries - 1)
    }
  }

  async isElementVisible (locator: string, retries: number = 1): Promise<any> {
    try {
      const element = await $(locator)
      const isVisible = element.isDisplayed()
      allureReporter.addStep(`Is element "${locator}" visible = ${isVisible}`, undefined, 'passed')
      return isVisible
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed to check if element "${locator}" is visible`, undefined, 'failed')
        throw new Error(`Unable to check ${locator} visibility after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(`Skip check if element "${locator}" is visible`, undefined, 'skipped')
      await this.sleep(250)
      return this.isElementVisible(locator, retries - 1)
    }
  }

  async getCssAttributeValue (locator: string, attrib: string, retries: number = 1): Promise<string> {
    try {
      const element = await $(locator)
      const cssProperty = await element.getCSSProperty(attrib)
      allureReporter.addStep(`CSS attribute "${attrib}" value of "${locator}"`, {type: 'text/plain', name: `CSS attribute ${attrib} value`, content: cssProperty.value}, 'passed')
      return cssProperty.value
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Failed to get CSS attribute "${attrib}" value of "${locator}"`, undefined, 'failed')
        throw new Error(`Unable to get CSS attribute value of  ${locator} after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(`Skipped getting CSS attribute "${attrib}" value of "${locator}"`, undefined, 'skipped')
      await this.sleep(250)
      return this.getCssAttributeValue(locator, attrib, retries - 1)
    }
  }

  async navigateToURL (url: any): Promise<void> {
    allureReporter.startStep('Navigate to ' + url)
    try {
      await browser.navigateTo(url)
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to navigate to ${url}, Error message: ${err.message}`)
    }
  }

  async browserRefresh () {
    allureReporter.startStep('Refresh page')
    await browser.refresh()
    allureReporter.endStep('passed')
  }

  async closeTab () {
    allureReporter.startStep('Close tab')
    await browser.closeWindow()
    allureReporter.endStep('passed')
  }

  async navigateBack () {
    allureReporter.startStep('Navigate to previous page')
    await browser.back()
    allureReporter.endStep('passed')
  }

  async sendTabKeyToCurrentElement () {
    allureReporter.startStep('Press Tab key')
    try {
      await browser.keys('Tab')
      allureReporter.endStep('passed')
    } catch (err) {
      allureReporter.endStep('failed')
      throw new Error(`Unable to send tab key after maximum retries, Error message: ${err.message}`)
    }
  }

  async waitForPageToBeLoaded (timeoutMs = 30000) {
    allureReporter.startStep('Wait for page to be loaded')
    const isJSLoaded = async function () {
      const isjQueryReady = await browser.execute('return typeof jQuery !== \'undefined\'')
      if (isjQueryReady) {
        const isDocLoad = await browser.execute('return document.readyState') === 'complete'
        let isjQueryLoaded
        try {
          isjQueryLoaded = await browser.execute('return jQuery.active') === 0
        } catch (err) {
          throw new Error(`Error Message: ${err.message}`)
        }
        return isDocLoad && isjQueryLoaded
      } else {
        return false
      }
    }
    await browser.waitUntil(isJSLoaded, {
      timeout: timeoutMs,
      timeoutMsg: `page is not loaded after ${timeoutMs / 1000} sec`
    })
    allureReporter.endStep('passed')
  }

  /**
     * Function to get a text list using defined CSS selector
     * @param {string} cssSelector
     * @param {number} retries
     * @returns {Promise<*>}
     */
  async getDropdownOptions (cssSelector: string, retries: number = 1): Promise<string> {
    try {
      const elements = await $$(`${cssSelector} option`)
      const options = []
      for (const element of elements) {
        options.push(await element.getText())
      }
      allureReporter.addStep(`Get dropdown options of "${cssSelector}"`, {name: `dropdown options`, content: options.join('\n'), type: 'text/plain'}, 'passed')
      return options
    } catch (err) {
      if (retries === 0) {
        allureReporter.addStep(`Get dropdown options of "${cssSelector}"`, undefined, 'failed')
        throw new Error(`Unable to get ${cssSelector} text after maximum retries, Error message: ${err.message}`)
      }
      allureReporter.addStep(`Get dropdown options of "${cssSelector}"`, undefined, 'skipped')
      await this.sleep(250)
      return this.getDropdownOptions(cssSelector, retries - 1)
    }
  }

  async sleep (timeout: number) {
    // skip logging sleeps less than 1000ms
    if (timeout > 999) {
      allureReporter.addStep(`Sleep for ${timeout / 1000} seconds`)
    }
    await browser.pause(timeout)
  }
  /**
     * Function to wait until number of tabs is equal to expectedTabsNumber
     * @param expectedTabsNumber
     * @param timeout - ms to wait until tabs number is
     * @returns {Promise<boolean>}
  */
  async waitUntilTabsNumberIsEqualTo (expectedTabsNumber: number, timeout = 10000) {
    allureReporter.startStep(`Wait for number of tabs to be ${expectedTabsNumber}`)
    await browser.waitUntil(async () => {
      return (await browser.getWindowHandles()).length === expectedTabsNumber
    }, {
      timeout,
      timeoutMsg: `Timed out waiting until number of tabs is equal to ${expectedTabsNumber} after ${timeout} ms`
    })
    allureReporter.endStep('passed')
  }
  /**
     * Function to wait until URL is equal to or includes expected URL
     * @param expectedUrl
     * @param includes - if true waits until url includes expectedURL
     * @returns {Promise<boolean>}
  */
  async waitUntilUrlIs (expectedUrl: string, includes = false) {
    allureReporter.startStep(`Wait until URL ${includes ? 'includes' : 'equal to'} ${expectedUrl}`)
    const timeout = 10000
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl()
      return includes ? currentUrl.includes(expectedUrl) : currentUrl === expectedUrl
    }, {
      timeout,
      timeoutMsg: `Timed out waiting for URL to ${includes ? 'include' : 'be equal to "' + expectedUrl}" after ${timeout} ms`
    })
    allureReporter.endStep('passed')
  }

  async waitUntil (condition: Promise<boolean>, {timeout = 15000, interval = 500, timeoutMsg = 'Timeout waiting for condition to be true'}) {
    await browser.waitUntil(condition, {timeout})
  }

  hasChineseCharacters (text: string) {
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u
    const hasChineseChars = REGEX_CHINESE.test(text)
    allureReporter.addStep(`Is text includes chinese characters = ${hasChineseChars}`, {name: `text`, content: `Text:\n${text}\nRegex:\n${REGEX_CHINESE}`, type: 'text/plain'}, 'passed')
    return hasChineseChars
  }

  async takeElementScreenshot (locator) {
    allureReporter.startStep(`Take screenshot of element: ${locator}`)
    try {
      const element = await $(locator)
      const screenshot = await browser.takeElementScreenshot(element.elementId)
      allureReporter.addAttachment('Element screenshot', Buffer.from(screenshot, 'base64'))
      allureReporter.endStep('passed')
    } catch (error) {
      allureReporter.addStep('Failed to take element screenshot. Taking element screenshots is only supported in Chromium-based browsers', {name: error, content: error.toString()})
      console.error(error.toString())
      allureReporter.endStep('failed')
    }
  }

  /**
     * Function to upload a file
     * @param {string} filepath
     * @param {number} retries
     * @returns {Promise<void>}
     */
  async uploadfile (locator: string, filepath: string, retries: number = 3): Promise<void> {
    allureReporter.startStep(`Click element "${locator}"`)
    try {
      // await this.waitForPageToBeLoaded()
      const element = await $(locator)
      await element.setValue(filepath)
      allureReporter.endStep('passed')
    } catch (err) {
      if (retries === 0) {
        allureReporter.endStep('failed')
        throw new Error(`Still not able to click ${locator} after maximum retries, Error message: ${err.message.toString()}`)
      }
      allureReporter.endStep('skipped')
      await this.sleep(250)
      return this.uploadfile(locator, filepath, retries - 1)
    }
  }
}
