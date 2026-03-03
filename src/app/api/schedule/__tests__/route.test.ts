import '@testing-library/jest-dom'

import {scrapeSchedule} from "../route";

describe('Schedule rendering', () => {
    test('Returns normal', async () => {
        const resp = await scrapeSchedule()
        expect(resp).toBeDefined();
    })
})