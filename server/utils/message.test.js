var expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate corrent message obj', () => {
        var from = 'jen'
        var text = 'some message'
        var message = generateMessage(from , text)

        expect(typeof message.createdAt).toEqual('number')
        expect(message).toMatchObject({from, text})

    })
})
