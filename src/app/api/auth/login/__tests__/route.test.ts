import '@testing-library/jest-dom'

import {login} from "../route";


describe('Login', () => {
    test('Can Log Into Test User', async () => {


        const resp = await login("test","test",{username:"test",password:"test",id:1})
        expect(resp).toBeDefined();
    })
    test('Fails on incorrect password', async () => {


        const resp = await login("test","wrongpassword",{username:"test",password:"test",id:1})
        expect(resp).toBeUndefined();
    })
    test('Can not log into unknown user', async () => {
        const resp = await login("asd9f8yaw90eyr9wye0ryf09sydbf980ewqyb9ebyr8qwe980yr","834759v283745902734957234572345872n34v90tv87uc245398tyn2",{username:"test",password:"test",id:1})
        expect(resp).toBeUndefined()
    })
})