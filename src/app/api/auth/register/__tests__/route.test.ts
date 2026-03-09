import '@testing-library/jest-dom'
import {POST} from "@/app/api/auth/register/route";



describe('Register Tests', () => {
    test('Registration endpoint exists', async () => {

        expect(POST).toBeDefined();
    })
})