const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

describe('POST operation tests', () => {
    test('Correct word count and text length', async () => {
        const response = await api.post('/analyze')
                                  .send({ text: 'hello 2 times  ' })

        expect(response.body.wordCount).toBe(3)
        expect(response.body.textLength.withSpaces).toBe(15)
        expect(response.body.textLength.withoutSpaces).toBe(11)
    })

    test('Correct character count without non-English characters in input', async () => {
        const response = await api.post('/analyze')
                                  .send({ text: 'hello 2 times  ' })

        expect(JSON.stringify(response.body.characterCount))
                   .toBe('[{"e":2},{"h":1},{"i":1},{"l":2},{"m":1},{"o":1},{"s":1},{"t":1}]')
    })

    test('Correct character count with non-English characters in input', async () => {
        const response = await api.post('/analyze')
                                  .send({ text: 'äåöôơaacccb' })

        expect(JSON.stringify(response.body.characterCount))
                   .toBe('[{"a":2},{"b":1},{"c":3}]')
    })
})