import * as chai from 'chai';

let expect = chai.expect;

describe('quirks', () => {
    it('string conversion to number', () => {
        let a: any = '\t\r\n12\r';

        expect(a - 1).to.equal(11);
    });

    it('NaN !== NaN', () => {
        expect(NaN === NaN).to.be.false;
    });

    it('Compare', () => {
        expect('9 > 8 > 7 === false in JS => true > 7 => 1 > 7 === false').to.not.be.undefined;
    });

    it('You should use for-loops(vs in-loops) for array iteration', function() {
        Array.prototype['extraMethod'] = function() { };

        let numbers = [0, 1, 2];

        // Using a property approach to access indices will also add in all the methods that have been added to the prototype
        for (var property in numbers) {
            if (isNaN(property)) {
                expect(property).to.equal('extraMethod');
            }
        }
    });

    it('typeof is used to identify the type of value inside a variable or expression', function() {
        expect(typeof true).to.equal('boolean');
        expect(typeof 'String').to.equal('string');
        expect(typeof 100).to.equal('number');
        expect(typeof undefined).to.equal('undefined');
        expect(typeof null).to.equal('object');
        expect(typeof function(){}).to.equal('function');
    });

    it('toString() function returns the string representation of the variable (primitves borrow from Object)', function() {
        expect(true.toString()).to.equal('true');
        expect('String'.toString()).to.equal('String');
        let number = 100;
        expect(number.toString()).to.equal('100');
        expect(String(number)).to.equal('100');
    });


});
