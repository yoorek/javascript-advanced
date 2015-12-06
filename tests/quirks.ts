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

    it('parseInt() looks for the first available integer at the front of a string', function() {
        expect(parseInt('55')).to.equal(55);
        expect(parseInt('55 is a great number')).to.equal(55);
    });

    it('if parseInt() does not find an acceptable value at the beginning of a string, it will return a NaN', function() {
        expect(isNaN(parseInt('A great number, 55'))).to.be.true;
    });

    it('parseInt() will trim off any decimals that may exist, without rounding', function() {
        expect(parseInt('5.78')).to.equal(5);
    });

    it('parseInt() will accept octal,hexadecimal and decimal values potentially creating undesired results', function() {
        // '021' is read as an octal value(base 8) and converts it to decimal
        expect(parseInt('021')).to.equal(21);// This is fixed on ECMAScript5 in ES3 == 17
    });
    it('you can use a radix value to ensure correct parsing', function() {
        // parseInt will accept any radix value from 2-36 for selecting the Base for the result
        expect(parseInt('021', 10)).to.equal(21);
    });

});
