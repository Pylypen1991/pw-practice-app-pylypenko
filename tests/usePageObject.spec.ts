import {test, expect} from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datepickerPage';
import { PageManager } from '../page-objects/pageManger';
import { faker } from '@faker-js/faker';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigates to form layouts page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigationTO().formLayoutsPage()
    await pm.navigationTO().datepickerPage()
    await pm.navigationTO().smartTablePage()
    await pm.navigationTO().toastPage()
    await pm.navigationTO().tooltipPage()
})

test('parametrized methods', async ({page}) => {
    const pm = new PageManager(page)
    const randomFulName = faker.person.fullName() // random name
    const randomEmail = `${randomFulName.replace(' ', '')}${faker.number.int(1000)}@test.com` // random email with name and random number

    await pm.navigationTO().formLayoutsPage()
    await pm.formLayoutsTO().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.formLayoutsTO().submitInlineWithNameEmailANdCheckbox(randomFulName, randomEmail, false)
    // await pm.navigationTO().datepickerPage()
    // await pm.datepickerTO().selectCommonDatepickerDateFromToday(10)
    // await pm.datepickerTO().selectDatepckerWithRangeFromToday(5, 10)

})

test('testing with agros ci', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigationTO().formLayoutsPage()
    await pm.navigationTO().datepickerPage()
})