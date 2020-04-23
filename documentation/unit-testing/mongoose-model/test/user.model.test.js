// __tests__/user.test.js
const mockingoose = require('mockingoose').default;
const model = require('../user.model.js');

describe('return hardcoding the result', () => {
    test('findById mocking', () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
        };

        mockingoose(model).toReturn(_doc, 'findOne');

        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    test('update mocking', () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
        };

        mockingoose(model).toReturn(_doc, 'update');

        return model
            .update({ name: 'changed' }) // this won't really change anything
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });
});

describe('return using a function to give the result', () => {
    test('should return the doc with findById', () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'name',
            email: 'name@email.com',
        };
        const finderMock = query => {
            expect(query.getQuery()).toMatchSnapshot('findById query');

            if (query.getQuery()._id === '507f191e810c19729de860ea') {
                return _doc;
            }
        };

        mockingoose(model).toReturn(finderMock, 'findOne'); // findById is findOne

        return model.findById('507f191e810c19729de860ea').then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });
});

describe('reseting the effects of a call', () => {
    test('should reset model mock', () => {
        mockingoose(model).toReturn({ name: '1' });
        mockingoose(model).toReturn({ name: '2' }, 'save');

        mockingoose(model).reset(); // will reset all operations;
    });
});