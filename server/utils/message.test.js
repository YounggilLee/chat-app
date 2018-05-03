var expect = require('expect')

var { generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate corrent message obj', () => {
        var from = 'jen'
        var text = 'some message'
        var message = generateMessage(from , text)

        expect(typeof message.createdAt).toEqual('number')
        expect(message).toMatchObject({from, text})

    })
})

describe('generateMessage', () => {
    it('should generate corrent message obj', () => {
        var from = 'Gil'
        var latitude = 15
        var longitude = 19
        var url = 'https://www.google.com/maps?q=15,19'
        var message = generateLocationMessage(from, latitude, longitude)

        expect(typeof message.createdAt).toEqual('number')
        expect(message).toMatchObject({ from, url })
    })
})