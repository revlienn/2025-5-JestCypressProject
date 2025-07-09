/* COURSE 1-3

cmd
    start your git
    npm i
    go to server dir, npm run server
    main dir, npm run start

*/

// COURSE 5
/*

want test a simple service

theory
Prepare Something to Test
    Use a simple Angular service (calculator.service.ts) under src/app/services.
    This service has two methods:
        add(a, b)
        subtract(a, b)
    One dependency, logger.service.ts, which logs messages to the console.

Understand Jasmine Basics
    Jasmine is a behavior-driven JavaScript testing framework.
    It provides everything needed for testing: test creation, running, and reporting.
    Key terminology:
        Test Suite: Group of tests using describe().
        Specification (Spec): Individual test using it().

Steps
1. Create Your First Test File
    Create a test file next to the file to be tested:
        Example: calculator.service.spec.ts
        The .spec.ts suffix is necessary for Angular CLI recognition and typings.

2. Define the Test Suite
    describe('CalculatorService', () => {
        ...
    });
    Use the describe() function to group tests.

3. Add Initial Test Specs
    what features/functionality, add inside it(), then add code
        it('should do what', () => {
            code ...
        });

    use pending if you dont have the code yet
        it('should subtract two numbers', () => {
            pending();
        });


4. Run the Initial Tests
Run tests using Angular CLI, cmd > ng test
    wait, it'll use Karma Test Runner and launches Chrome to execute specs.
    i got: 2 specs, 0 failures, 2 pending specs
        thats because i have 2 specs, both are pending
    it also display the specs
        CalculatorService
            the test suite name
            refresh you did describe("CalculatorService",...)
        should subtract two numbers PENDING <in yellow text>
        should add two numbers PENDING <in yellow text>
            yellow == pending

optional
Simulate failure with fail() utility:
    it('should add two numbers', () => {
        fail('Simulated failure');
    });
    Save the file and Karma will hot reload and show the failing spec in red.

Disable Hot Reload
    hot reload: auto update test result when you change the code
    Run tests in normal mode, exit, then run again with ng test --no-watch

*/

// COURSE 6
/*

want define the test

Start with a Simple Test
Focus: calculator.service.ts with two methods:
    add(a, b)
    subtract(a, b)

1. Implement the First Specification: it should add two numbers
Set up an instance of CalculatorService, it has one dependency: logger
    const calculator = new CalculatorService(new LoggerService());
Execute the operation, assert result
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
        side notes toBe has many types
            toBeFalsy, toBeLessThan, toBeCloseTo ..., do explore
                    change the fail() to pending()

2. Run the Test
Use Angular CLI, ng test
    Result: Executed 1 of 2 specs – 1 passed, 1 pending
    In browser: 'it should add two numbers appears' in green

3. Implement the Second Specification: it should subtract two numbers
    Copy and adapt the first test:
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0);
            Save to trigger Karma hot reload.
    Result: Executed 2 of 2 specs – 2 passed (both specs now green)

part Simulate a Failing Test
1. Introduce a bug in subtract() method (e.g., multiply instead of subtract).
    real result is 2, i put in expect(1)   
    Run the test → karma msg "Expected 2 to be 1"
        Expected <x> is what karma get
        to be <x> is what you put

2. Improve Error Messages in Assertions
Add a custom error message to expect():
    expect(result).toBe(0, 'Expected subtraction result to be 0');
    Useful for debugging failing specs.


Next topic: 
Prepare for Advanced Testing > Introducing Jasmine spies to test whether dependencies (like LoggerService) are called properly.
Example use case: Ensure logger.log() is called only once per operation.

*/
