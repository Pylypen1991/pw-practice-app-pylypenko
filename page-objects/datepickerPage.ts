import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class DatepickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)

    }

    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker') // locates the date picker input field
        await calendarInputField.click() // opens the date picker
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday) // selects the date in the calendar
        await expect(calendarInputField).toHaveValue(dateToAssert) // asserts that the input field has the correct date
        

            // await expect(calendarInputField).toHaveValue(dateToAssert) // asserts that the input field has the correct date 
            // await expect(calendarInputField).toHaveValue(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/) //  for date format MMM D, YYYY
    }

    async selectDatepckerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker') // locates the date picker input field
        await calendarInputField.click() // opens the date picker
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert) // asserts that the input field has the correct date
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday) // sets the date to 200 days from today
        const expectedDay = date.getDate().toString() // gets the day of the month
        const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' }) // gets the short month name
        const expectedYear = date.getFullYear().toString() // gets the year
        const dateToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`
        const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' }) // gets the long month name

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() // gets the current month and year displayed in the calendar
        const expectedMonthYear = `${expectedMonthLong} ${expectedYear}`
        while (!calendarMonthAndYear.includes(expectedMonthYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() // clicks the next month button
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() // updates the current month and year displayed in the calendar    
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDay, { exact: true }).click()
        return dateToAssert
    }
}