import '@testing-library/jest-dom'

import {getGameInformation} from "../route";

describe('Game rendering', () => {
    test('Returns normal when normal', async () => {
        const resp = await getGameInformation(6572793)
        expect(resp).toBeDefined();
    })
    test('Returns undefined when invalid', async () => {
        const resp = await getGameInformation(0)
        expect(resp).toBeUndefined()
    })
})