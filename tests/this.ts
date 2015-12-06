import * as chai from 'chai';

let expect = chai.expect;

describe('this', () => {

    it('console.assert expects `this` to be console', () => {
        let assert = console.assert;
        let bindAssert = console.assert.bind(console);

        try {
            assert(true);
        } catch (e) {
            expect(e.toString()).to.equal('TypeError: Illegal invocation');
        }

        bindAssert(true);
    });
});