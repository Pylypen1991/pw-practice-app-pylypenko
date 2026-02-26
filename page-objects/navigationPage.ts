import { Locator,   Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class NavigationPage extends HelperBase {

    
    constructor(page: Page){
        super(page);

    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumOfSecond(2) // waits for 2 seconds to ensure the page is fully loaded before proceeding with further actions
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms') // navigates to Forms section
        await this.page.getByText('Datepicker').click() // navigates to Datepicker page
       // waits for 2 seconds to ensure the page is fully loaded before proceeding with further actions
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
       // waits for 2 seconds to ensure the page is fully loaded before proceeding with further actions
    }

    async toastPage() {
        await this.selectGroupMenuItem('Modal & Overlays') // navigates to Modal & Overlays section
        await this.page.getByText('Toastr').click() // navigates to Toastr page
       // waits for 2 seconds to ensure the page is fully loaded before proceeding with further actions
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays') // navigates to Modal & Overlays section
        await this.page.getByText('Tooltip').click() // navigates to Tooltip page
       // waits for 2 seconds to ensure the page is fully loaded before proceeding with further actions
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState === 'false') {
            await groupMenuItem.click()
        }
    }

}
