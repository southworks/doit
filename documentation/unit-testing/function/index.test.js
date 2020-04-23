function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

describe('server test', () => {
    test("check parameters, resesponse and number of calls of a function", () => {
        const mockCallback = jest.fn(x => 42 + x);
        forEach([0, 1], mockCallback);

        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(2);

        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(0);

        // The first argument of the second call to the function was 1
        expect(mockCallback.mock.calls[1][0]).toBe(1);

        // The return value of the first call to the function was 42
        expect(mockCallback.mock.results[0].value).toBe(42);
    });

    test("count instances of a function", () => {
        const myMock = jest.fn();

        const a = new myMock();
        a.name = "a";
        const b = {};
        b.name = "b";
        const bound = myMock.bind(b);
        bound();

        console.log(myMock.mock.instances);
    });

    test("mocking return values of a function", () => {
        const myMock = jest.fn();
        console.log(myMock());
        // > undefined

        myMock
            .mockReturnValueOnce('x')
            .mockReturnValueOnce(10)
            .mockReturnValue(true);

        console.log(myMock(), myMock(), myMock(), myMock());
        // > 10, 'x', true, true
    });

    test("mocking the implementation of a function", () => {
        const myMockFn = jest
            .fn(() => 'default')
            .mockImplementationOnce(() => 'first call')
            .mockImplementationOnce(() => 'second call');

        console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
        // > 'first call', 'second call', 'default', 'default'
    });

    test("mock the function of an object", () => {
        const myObj = {
            myMethod: jest.fn().mockReturnThis(),
        };

        // is the same as

        const otherObj = {
            myMethod: jest.fn(function () {
                return this;
            }),
        };

        console.log(myObj.myMethod());
        console.log(otherObj.myMethod());
    })

    test("mockName", () => {
        const myMockFn = jest
            .fn()
            .mockReturnValue('default')
            .mockImplementation(scalar => 42 + scalar)
            .mockName('add42');

        //expect(myMockFn).toBeCalled();
    });

    test("checks the parameters with how the function has been called", () => {
        const mockFunc = jest.fn();
        const arg1 = "arg1";
        const arg2 = "arg2";

        mockFunc(arg1, arg2);
        // The mock function was called at least once
        expect(mockFunc).toHaveBeenCalled();

        // The mock function was called at least once with the specified args
        expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

        // The last call to the mock function was called with the specified args
        expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

        // All calls and the name of the mock is written as a snapshot
        expect(mockFunc).toMatchSnapshot();
    });

    test("custom matchers", () => {
        const mockFunc = jest.fn().mockName("a mock name");
        const arg1 = 42;
        const arg2 = "arg2";
        mockFunc(arg1, arg2);
        // The mock function was called at least once
        expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

        // The mock function was called at least once with the specified args
        expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

        // The last call to the mock function was called with the specified args
        expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
            arg1,
            arg2,
        ]);

        // The first arg of the last call to the mock function was `42`
        // (note that there is no sugar helper for this specific of an assertion)
        expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

        // A snapshot will check that a mock was invoked the same number of times,
        // in the same order, with the same arguments. It will also assert on the name.
        expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
        expect(mockFunc.getMockName()).toBe('a mock name');
    });
});