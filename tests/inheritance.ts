import * as chai from 'chai';

let expect = chai.expect;

describe('inheritance', function() {

    it('create objects using literals', () => {

        let parentLiteral: any = {
            parentProperty: 'default',
            getParentProperty: function() {
                return this.parentProperty;
            }
        };

        expect(typeof parentLiteral.__proto__).to.equal('object');
        expect(parentLiteral instanceof Object).to.be.true;
        expect(parentLiteral.__proto__.isPrototypeOf(Object)).to.be.true;
        expect(parentLiteral.__proto__.constructor.name).to.equal('Object');
        expect(parentLiteral.__proto__.toString()).to.equal('[object Object]');
        expect(parentLiteral.__proto__ instanceof Object).to.be.false;
    });

    it('inherit using literals and __proto__', () => {
        let parentLiteral: any = {
            parentProperty: 'parent',
            getParentProperty: function() {
                return this.parentProperty;
            }
        };

        let childLiteral: any = {
            getChildProperty: function() {
                return this.childProperty;
            },
            childProperty: 'child',
            parentProperty: 'child'
        };

        expect(childLiteral.getParentProperty).to.be.undefined;

        childLiteral.__proto__ = Object.create(parentLiteral);

        expect(childLiteral.getParentProperty()).to.equal('child');

        let childLiteral2: any = {};

        Object.setPrototypeOf(childLiteral2, Object.create(parentLiteral));

        expect(childLiteral2.getParentProperty()).to.equal('parent');

    });


    it('inherit with Constructors', () => {

        let BadConstructor = function(parentProperty) {
            this.name = parentProperty;
        };

        expect(BadConstructor.prototype.constructor.name).to.equal('');

        function BadConstructor2(parentProperty) {
            this.parentProperty = parentProperty || 'default';
        }

        BadConstructor2.prototype = {
            getProperty: () => {
                return 'test';
            }
        };

        expect(BadConstructor2.prototype.constructor).to.equal(Object);

        function ParentConstructor(parentProperty) {
            this.parentProperty = parentProperty || 'default';
        }

        ParentConstructor.prototype.getParentProperty = function() {
            return this.parentProperty;
        };

        expect(typeof ParentConstructor.prototype).to.equal('object');
        expect(typeof ParentConstructor).to.equal('function');
        expect(ParentConstructor.prototype.constructor).to.equal(ParentConstructor);
        expect(ParentConstructor.prototype.constructor.name).to.equal('ParentConstructor');
        expect(ParentConstructor['__proto__'] = Function.prototype);

        function ChildConstructor(parentProperty, childProperty) {
            ParentConstructor.call(this, parentProperty);

            this.childProperty = childProperty;
        }

        ChildConstructor.prototype = ParentConstructor.prototype;
        ChildConstructor.prototype.badPropertyAlsoInParent = 'bad';

        expect(ParentConstructor.prototype.badPropertyAlsoInParent).to.equal('bad');

        ChildConstructor.prototype = new ParentConstructor('test');

        expect(ChildConstructor.prototype.parentProperty).to.be.equal('test');

        ChildConstructor.prototype = Object.create(ParentConstructor.prototype);

        expect(ChildConstructor.prototype.parentProperty).to.be.undefined;

        let child: any = new ChildConstructor('parentProperty', 'childProperty');

        expect(child.getParentProperty()).to.equal('parentProperty');
        expect(child.childProperty).to.equal('childProperty');

        expect(child.__proto__).to.equal(ChildConstructor.prototype);
    });


});


function extend(target, source) {
    Object
        .getOwnPropertyNames(source)
        .forEach(function(propName) {
            Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        });
    return target;
}

function inherits(SubC, SuperC) {
    let subProto = Object.create(SuperC.prototype);
    // At the very least, we keep the "constructor" property
    // At most, we preserve additions that have already been made
    // to allow 'inherits' after constructing subprototype
    extend(subProto, SubC.prototype);
    SubC.prototype = subProto;
    SubC._super = SuperC.prototype;
}

