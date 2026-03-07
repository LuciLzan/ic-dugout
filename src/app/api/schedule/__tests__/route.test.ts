import '@testing-library/jest-dom'
import {scrapeSchedule} from "@/services/IllinoisCollegeAPI";



describe('Schedule rendering', () => {
    test('Returns normal', async () => {
        const resp = await scrapeSchedule()
        expect(resp).toBeDefined();
    },60000)
})