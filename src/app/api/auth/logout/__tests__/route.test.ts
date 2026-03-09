import '@testing-library/jest-dom'
import {POST} from "@/app/api/auth/logout/route";




describe('Logout', () => {
    test('Logout Route Exists', async () => {
        expect(POST).toBeDefined();
    })

})