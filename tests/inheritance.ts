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

        childLiteral.__proto__ = parentLiteral;

        expect(childLiteral.getParentProperty()).to.equal('child');

        let childLiteral2: any = {};

        Object.setPrototypeOf(childLiteral2, parentLiteral);

        expect(childLiteral2.getParentProperty()).to.equal('parent');

    });

    it('inherit using Object.create (has to add properties one by one or use Extend function)', () => {
        let parentLiteral: any = {
            parentProperty: 'parent',
            getParentProperty: function() {
                return this.parentProperty;
            }
        };

        let childLiteral = Object.create(parentLiteral);

        expect(childLiteral.getParentProperty()).to.equal('parent');
        expect(childLiteral['__proto__']).to.equal(parentLiteral);

        expect(childLiteral.hasOwnProperty('parentProperty')).to.be.false;
        expect(childLiteral.__proto__.hasOwnProperty('parentProperty')).to.be.true;
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
            this.array = [];
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
            ParentConstructor.call(this);
            this.childProperty = childProperty;
        }

        // DON'T USE
        ChildConstructor.prototype = ParentConstructor.prototype;
        ChildConstructor.prototype.shouldBeOnlyInChild = 'bad';

        let p = new ParentConstructor('parent');

        expect(p.shouldBeOnlyInChild).to.equal('bad');

        // DON'T USE
        ChildConstructor.prototype = new ParentConstructor('test');

        let c1 = new ChildConstructor('p', 'c1');

        expect(c1.hasOwnProperty('parentProperty')).to.be.true;
        expect(c1.__proto__.hasOwnProperty('parentProperty')).to.be.true;

        c1.array.push('1');

        let c2 = new ChildConstructor('p', 'c2');

        // Error - c2 shares properties with c1 ONLY good because calling super constructo
        expect(c2.array[0]).to.be.undefined;

        expect(ChildConstructor.prototype.parentProperty).to.be.equal('test');

        ChildConstructor.prototype = Object.create(ParentConstructor.prototype);

        expect(ChildConstructor.prototype.parentProperty).to.be.undefined;

        let child: any = new ChildConstructor('parentProperty', 'childProperty');

        expect(child.hasOwnProperty('parentProperty')).to.be.true;
        expect(child.__proto__.hasOwnProperty('parentProperty')).to.be.false;
        expect(child.childProperty).to.equal('childProperty');

        expect(child.__proto__).to.equal(ChildConstructor.prototype);
    });

    it('you can use hasOwnProperty to identify the property location', function() {

        function Person(firstName) {
            this.firstName = firstName;
        }

        Person.prototype.lastName = function() {
            return 'Chavez';
        };

        let person = new Person('Martin');

        expect(person.hasOwnProperty('lastName')).to.be.false;
        expect(person.constructor.prototype.hasOwnProperty('lastName')).to.be.true;
        expect(person.__proto__.hasOwnProperty('lastName')).to.be.true;
    });

    it('returning value from constructors', () => {
        function Person(name) {
            this.name = name;
        }

        let p = new Person('Joe');

        expect(p.name).to.equal('Joe');
        expect(p instanceof Person).to.be.true;

        function Man(name) {
            return {
                name: name
            };
        }

        /* let m = new Man('Joe');
        
        expect(m.name).to.equal('Joe');
        expect(m instanceof Man).to.be.false; */
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
    // At the very least, we keep the 'constructor' property
    // At most, we preserve additions that have already been made
    // to allow 'inherits' after constructing subprototype
    extend(subProto, SubC.prototype);
    SubC.prototype = subProto;
    SubC._super = SuperC.prototype;
}

