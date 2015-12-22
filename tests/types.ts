import * as chai from 'chai';

let expect = chai.expect;

describe('types', () => {

    it('typeof is used to identify the type of value inside a variable or expression', function() {
        expect(typeof true).to.equal('boolean');
        expect(typeof 'String').to.equal('string');
        expect(typeof 100).to.equal('number');
        expect(typeof undefined).to.equal('undefined');
        expect(typeof null).to.equal('object');
        expect(typeof function() { }).to.equal('function');
    });

    it('toString() function returns the string representation of the variable (primitives borrow from Object)', function() {
        expect(true.toString()).to.equal('true');
        expect('String'.toString()).to.equal('String');
        let number = 100;
        expect(number.toString()).to.equal('100');
        expect(String(number)).to.equal('100');
    });

    it('Lenient == comparison of Built In Constructor types', () => {
        expect('abc' == new String('abc')).to.be.true;
        expect('abc' == String('abc')).to.be.true;
        expect(String('abc') == String('abc')).to.be.true;
        expect(typeof String('abc')).to.equal('string');
        expect(typeof new String('abc')).to.equal('object');
        expect(new String('abc') == new String('abc')).to.be.false;
    });

});


