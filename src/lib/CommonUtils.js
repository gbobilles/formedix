// @flow
import dateFormat from 'dateformat'
// import EnvConfig from '../testdata/inputdata/EnvConfig'

export default {
  isLeapYear (year): Promise<boolean> {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
  },

  /**
     * Takes a current date and add total days of month and returns future date in next months
     * or last day of next month if next month days is less than current months day
     * @returns {Promise<any>} The next month date
     */

  async getNextShippingDate (): Promise<any> {
    let now = await new Date()
    let lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    let lastDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0).getDate()
    let currentDayOfMonth = now.getDate()
    let currentYear = now.getFullYear()
    let nextDate

    if (await this.isLeapYear(currentYear) && now.getMonth() === 0) { // if leap year and is january
      lastDayOfNextMonth = 29
    } else if (await this.isLeapYear(currentYear) && now.getMonth() === 1) { // if leap year and february
      lastDayOfMonth = 29
    }

    if (currentDayOfMonth === 29 && lastDayOfNextMonth === 28 && currentDayOfMonth - lastDayOfNextMonth === 1) {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfNextMonth + 2))
    } else if (currentDayOfMonth - lastDayOfNextMonth === 1 && await this.isLeapYear(currentYear) && currentDayOfMonth !== 31) {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfNextMonth + 1))
    } else if (currentDayOfMonth - lastDayOfNextMonth === 2 && await this.isLeapYear(currentYear)) {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfNextMonth))
    } else if (currentDayOfMonth - lastDayOfNextMonth === 1) {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfNextMonth))
    } else if (currentDayOfMonth - lastDayOfNextMonth === 2) {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfNextMonth + 1))
    } else if (currentDayOfMonth - lastDayOfNextMonth === 3) {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfNextMonth))
    } else {
      nextDate = await now.setDate(now.getDate() + parseInt(lastDayOfMonth))
    }
    dateFormat.masks.nextShippingDate = 'mm/dd/yyyy'
    return dateFormat(nextDate, 'nextShippingDate')
  },

  /**
     * Takes a positive integer and returns the corresponding alphabets.
     * @param {number} num  The positive integer to convert to a alphabets
     * @return {string}  The alphabets.
     */
  toColumnName (num: number): Promise<any> {
    let ret, a, b
    for (ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
      ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret
    }
    return ret
  },

  getCurrentDate (): Promise<string> {
    let today = new Date()

    dateFormat.masks.todayDate = 'mm/dd/yyyy'
    return dateFormat(today, 'todayDate')
  },

  // getFullCurrentDate (): Promise<string> {
  //   if (EnvConfig.HOST() === 'REMOTE') {
  //     return this.getCustomFormatDate(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}), 'mmm d, yy, h:MM:ss TT', false)
  //   } else {
  //     return this.getCustomFormatDate(new Date(), 'mmm d, yy, h:MM:ss TT', false)
  //   }
  // },

  getCurrentDateFullMonth (): Promise<string> {
    let today = new Date()

    dateFormat.masks.todayDate = 'dd-mmmm yyyy'
    return dateFormat(today, 'todayDate')
  },

  getCurrentYear (): Promise<string> {
    let now = new Date()
    return now.getFullYear()
  },

  getDateFullMonth (newDate: string): Promise<string> {
    dateFormat.masks.fullMonthDate = 'dd-mmmm yyyy'
    return dateFormat(newDate, 'fullMonthDate')
  },

  getDayFromDate (newDate: string): Promise<string> {
    dateFormat.masks.newDate = 'd'
    return dateFormat(newDate, 'newDate')
  },

  getMonthFromDate (newDate: string): Promise<string> {
    dateFormat.masks.newDate = 'mmm'
    return dateFormat(newDate, 'newDate')
  },

  getYearFromDate (newDate: string): Promise<string> {
    dateFormat.masks.newDate = 'yyyy'
    return dateFormat(newDate, 'newDate')
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async getTomorrowDate (): Promise<string> {
    let now = new Date()
    let currentDayOfMonth = await now.getDate()
    let nextDate = await now.setDate(parseInt(currentDayOfMonth + 1))
    dateFormat.masks.tomorrowDate = 'mm/dd/yyyy'
    return dateFormat(nextDate, 'tomorrowDate')
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async getNextDate60DaysFromToday (): Promise<string> {
    let now = new Date()
    let currentDayOfMonth = await now.getDate()
    let nextDate = await now.setDate(parseInt(currentDayOfMonth + 61))
    dateFormat.masks.tomorrowDate = 'mm/dd/yyyy'
    return dateFormat(nextDate, 'tomorrowDate')
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async getNextDate30DaysFromToday (): Promise<string> {
    let now = new Date()
    let currentDayOfMonth = await now.getDate()
    let nextDate = await now.setDate(parseInt(currentDayOfMonth + 31))
    dateFormat.masks.tomorrowDate = 'mm/dd/yyyy'
    return dateFormat(nextDate, 'tomorrowDate')
  },

  /**
   * @returns {Promise<string>}
   */

  async getNextDateFromCustomDate (date: Date, daysToAdd: number): Promise<string> {
    let now = new Date(date)
    let currentDayOfMonth = await now.getDate()
    let nextDate = await now.setDate(parseInt(currentDayOfMonth + daysToAdd))
    return this.getCustomFormatDate(nextDate, 'mm/dd/yyyy')
  },

  /* NUM parameter:
  - Is the number to be converted

  STYLE parameter possible values:
  - "decimal" for plain number formatting.
  - "currency" for currency formatting.
  - "percent" for percent formatting.
  - the default is "decimal".

   LOCALE parameter possible values:
   - The locales argument must be either a string holding a BCP 47 language tag,
    or an array of such language tags (http://tools.ietf.org/html/rfc5646)
   - Examples: 'en-US' => English-United States, 'zh-HK' => Chinese-Hong Kong, 'en-SG' => English-Singapore
   - Default value 'en-US'

   CURRENCY parameter possible values:
   - Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro
   - See the Current currency & funds code list (http://www.currency-iso.org/en/home/tables/table-a1.html)
   - Examples: "USD" for the US dollar, "EUR" for the euro, "SGD" for Singapore Dollars, "HKD" for Hong Kong Dollars
   - Default value 'USD'
   */
  convertTo (num: number, style: string, locale: string = 'en-US', currency: string = 'USD'): Promise<any> {
    let returnValue
    let formatter = new Intl.NumberFormat(locale, {
      style: style,
      currency: currency
    })
    // This removes empty spaces between the Currency symbol and the value
    if (style === 'currency') {
      returnValue = formatter.format(num).replace(/\s+/, '')
    } else {
      returnValue = formatter.format(num)
    }
    return returnValue
  },

  toCurrency (num: number, market: number = 1): Promise<any> {
    let returnValue
    let locale = market === 1 ? 'en-US' : market === 2 ? 'en-SG' : 'zh-HK'
    let currencyCode = market === 1 ? 'USD' : market === 2 ? 'SGD' : 'HKD'
    let formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    })
    // This removes empty spaces between the Currency symbol and the value
    returnValue = formatter.format(num).replace(/\s+/, '')
    return market === 2 ? `S${returnValue}` : returnValue
  },

  getActivationDateFormat (date: Date): Promise<any> {
    date.setHours(date.getHours() + 1)
    dateFormat.masks.activationDate = 'm/d/yy h:MM TT'
    return dateFormat(date, 'activationDate', true)
  },

  // Round to nearest X minutes
  getRoundedDate (minutes: any, date: Date): Promise<Date> {
    let ms = 1000 * 60 * minutes // convert minutes to ms
    return new Date(Math.round(date.getTime() / ms) * ms)
  },

  getRenewalDate (date: Date, yearToAdd: number = 1): Promise<Date> {
    if (date !== null) {
      let newDate = new Date(date)
      let newFullYear = newDate.getUTCFullYear() + yearToAdd
      newDate.setUTCFullYear(newFullYear)
      return this.getRenewalDateFormat(newDate)
    } else {
      return 0
    }
  },

  getRenewalDateFormat (date: Date): Promise<any> {
    if (date !== null) {
      dateFormat.masks.renewalDate = 'm/d/yy h:MM TT'
      return dateFormat(date, 'renewalDate', true)
    } else {
      return 0
    }
  },

  getCustomFormatDate (date: Date, format: string, utc: boolean = true): Promise<Date> {
    dateFormat.masks.customFormat = format
    return dateFormat(date, 'customFormat', utc)
  },

  sleep (ms: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async addOneDayToCustomDate (date: Date): Promise<string> {
    let now = new Date(date)
    let oldDate = await now.getDate()
    let nextDate = await now.setDate(parseInt(oldDate + 1))
    return this.getCustomFormatDate(nextDate, 'mm/dd/yyyy')
  },

  getCurrentFolder (dirname: string) {
    let foldersToRemove = ['optavia-us', 'optavia-hk', 'optavia-sg', 'asm-us', 'asm-hk', 'asm-sg']
    let testPath = dirname.split('/test/')[1].split('/')
    testPath.forEach(item => {
      foldersToRemove.forEach(exc => {
        if (item === exc) {
          testPath = testPath.filter(el => el !== exc)
        }
      })
    })
    return testPath.toString().replace(/,/g, '/')
  },

  getFullPath (dirname: string) {
    return dirname.split('/qa-automation-optavia/')[1]
  },

  calculateVoucherDiscount (discountValue: any, price: number) {
    let priceWithDiscount
    let discount
    let discountAmount
    discountValue = discountValue.toString()
    let isPercentage = discountValue.includes('%')
    if (isPercentage !== false) {
      discount = parseInt(discountValue.slice(0, -1))
      discount = (discount / 100)
      priceWithDiscount = price - (price * discount)
      discountAmount = price - priceWithDiscount
    } else {
      discount = parseFloat(discountValue)
      priceWithDiscount = price - discount
      discountAmount = price - priceWithDiscount
    }
    return {priceWithDiscount: priceWithDiscount, discountAmount: discountAmount}
  },

  countWordsOnString (word: String) {
    return word.split(' ').length
  },

  randomNumberGenerator (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },

  isDateInThePast (date: Date) {
    let now = new Date(date)
    return date < now
  },

  getIndexOfItemFromArray (itemsArray, item) {
    return itemsArray.indexOf(item)
  },

  convertState (input: string, to: string) {
    let states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY']
    ]

    if (to === 'abbr') {
      input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
      for (let i = 0; i < states.length; i++) {
        if (states[i][0] === input) {
          return (states[i][1])
        }
      }
    } else if (to === 'name') {
      input = input.toUpperCase()
      for (let i = 0; i < states.length; i++) {
        if (states[i][1] === input) {
          return (states[i][0])
        }
      }
    }
  },

  getPreviousMonthNumber () {
    let now = new Date()
    now.setMonth(now.getMonth() - 1)
    let monthRaw = now.getMonth() + 1
    let month
    monthRaw < 10 ? month = '0' + monthRaw : month = `${monthRaw}`
    return month
  }
}
