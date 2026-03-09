import '@testing-library/jest-dom'
import {GET} from "@/app/api/auth/me/route";





describe('Logout', () => {
    test('Logout Route Exists', async () => {
        expect(GET).toBeDefined();
    })

})