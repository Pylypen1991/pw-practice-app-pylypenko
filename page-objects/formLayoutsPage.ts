import { Page } from '@playwright/test';
import { using } from 'rxjs';
import { HelperBase } from './helperBase';

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page) {
        super(page);

    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * Submits the inline form with the provided name, email, and checkbox option.
     * @param name The name to fill in the inline form
     * @param email The email to fill in the inline form
     * @param checkbox Whether to check the checkbox in the inline form
     */

    async submitInlineWithNameEmailANdCheckbox(name: string, email: string, checkbox: boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        if (checkbox)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }

}