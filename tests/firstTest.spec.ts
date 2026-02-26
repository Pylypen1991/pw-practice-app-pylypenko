import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
    // by Tag name
    await page.locator('input').first().click()

    // by id
    await page.locator('#inputEmail1').click()

    // by Class value
    page.locator('.shape-rectangle')

    // by Attribute
    page.locator('[placeholder="Email"]')

    // by full Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"]')

    // be Xpath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'Sign in' }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: 'Sign in' }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click()
})

test('Reusing the locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async ({page}) => {
    //single text value
        const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
        const buttonText = await basicForm.locator('button').textContent()
        expect(buttonText).toEqual('Submit')
    
    // all text value
    const allText = await page.locator('nb-radio').allTextContents()
    expect(allText).toContain('Option 1')

    //input value
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // placeholder

    const placeholderValue =  await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({page}) => {
     const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')

    // General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicForm.textContent()
    expect(text).toContain('Submit')

    // Locator assertions
    await expect(basicForm).toHaveText('Submit')

    // Soft assertions
    await expect.soft(basicForm).toHaveText('Submit5')
    await basicForm.click()
})