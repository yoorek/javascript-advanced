import * as chai from 'chai';

let expect = chai.expect;

describe('functions', () => {
    it('Closures bind values at the very last opportunity ', function() {

        function outsideClosure() {
            let insideFunction;
            let i;

            for (i = 0; i < 10; i++) {
                if (i === 3) {
                    insideFunction = function insideClosure() {
                        return i;
                    };
                }
            }
            return insideFunction;
        }

        let insideClosure = outsideClosure();

        expect(insideClosure()).to.equal(10);

        function outsideClosure2() {
            let insideFunction;
            let i;

            for (i = 0; i < 10; i++) {
                if (i === 3) {
                    (function createClosureForLoop(k) {
                        insideFunction = function insideClosure() {
                            return k;
                        };
                    })(i);
                }
            }
            return insideFunction;
        }

        insideClosure = outsideClosure2();

        expect(insideClosure()).to.equal(3);
    });


    it('Javascript loads functions and variables that need space in memory first', function() {

        function Universe() {
            // This variable is loaded as var variableInMemory =  undefined;
            let variableInMemory = functionResult();
            return variableInMemory;

            function functionResult() { // This function gets loaded at the top
                return 5;
            }
        }

        expect(Universe()).to.equal(5);
    });


});

