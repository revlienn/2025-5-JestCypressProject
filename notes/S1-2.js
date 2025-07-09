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

// COURSE 7
/*

want
Ensure that LoggerService.log() is called only once when CalculatorService.add() is executed.
Detect and notice fail the test if log() is called multiple times (resource optimization).

solution Two Approaches to Spying

part 🧪 Approach A: Spying on an Actual Instance
Create the dependency, spyOn inside the spec
    const logger = new LoggerService();
    spyOn(logger, 'log');
        'log' is the logger's method name
Inject into calculator, expect
    const calculator = new CalculatorService(logger);
        ...other code...
    expect(logger.log).toHaveBeenCalledTimes(1);
        success
Try an error
    calculator.service.ts
        inside add, execute logger.log again
    Example error:
        "Expected spy log to have been called once, but it was called twice."

part 🧪 Approach B: Using a Jasmine Spy Object (Preferred for Unit Tests)
Basically, the only instance should be the actual service we're testing
    if that service has a dependency, like calculator depending on logger, then logger should be in a mock version, not init like approach A
We can spy on the dependency

Create a fake/mock logger service, inject into calculator
    const loggerMock = jasmine.createSpyObj('LoggerServiceMock', ['log']);
        first par is the spy name, second par is methodName
            notice first par can be anything, methodName MUST match
    const calculator = new CalculatorService(loggerMock);
        How come the spy/first par name can be anything?
            Since you’re instantiating CalculatorService manually, and it only has one dependency, it doesn't care what you name it (loggerMock, LoggerServiceMock, etc.).
            As long as that mock has a .log() method, it works.
            Jasmine doesn’t need to "know" the mock’s type since it only spies, not execute

Perform and assert:     
    calculator.add(2, 2);
    expect(logger.log).toHaveBeenCalledTimes(1);
Test passes — spy object tracks calls.

part Common Mistake
    Creating a spy object with missing methods:
        jasmine.createSpyObj('LoggerService', []);
        → ❌ Throws an error when calling logger.log().

Advanced Spy Use: Returning Custom Values
    If a method should return a value, use:
        logger.log.and.returnValue('mocked return');
    later course, dont panic

Why Use Jasmine Spies?
    Track how many times a method is called.
        it doesnt need to know the service BUT the method name must be identical
    Avoid relying on real service implementations (especially those with side effects).
    Return mock values for test predictability.
    Focus only on the unit under test (e.g., CalculatorService) — not its dependencies.

Next Steps
    Avoid repeating setup code in each test.
        eg when initialising a spy
    Introduce Dependency Injection into the test setup to share spy/mock creation logic.
    Move toward scalable and maintainable test structures.

*/

// COURSE 8
/*

want
Eliminate repeated initialization code in unit tests.
Ensure test isolation and prepare for Angular-style dependency injection in tests.

0. Change the code
remove the approach a and approach b thing, proceed with spy on mock/approach b for both

1. Identify Repeated Setup Code
You have two repeated lines
    const loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(loggerSpy);
        Both are repeated in each spec → move to a shared setup block.

2. Use Jasmine’s beforeEach() Block
Declare shared variables at the suite level:
    let calculator: CalculatorService;
    let loggerSpy: any;
Move shared logic into beforeEach(), delete const cos you define with let above
    beforeEach(() => {
        console.log('Calling beforeEach');
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        calculator = new CalculatorService(loggerSpy);
    });

3. Verify Test Independence
What happens now is that beforeEach will be called before executing both tests
    Add console log to beforeEach, and to each test
    Console Output Confirms
        Calling beforeEach 
        Add test
        Calling beforeEach
        Subtract test
    beforeEach() runs before every test, ensuring:
        Fresh state
        No cross-test interference
        Safe test reordering

4. Best Practice Reminder
If changing test order causes failures → your tests are not isolated properly.
Check that:
    Shared variables are reset in beforeEach()
    No shared state is mutated across specs

What’s Next
    Continue using Jasmine's beforeEach() to organize logic.
    Introduce Angular’s TestBed for real dependency injection (DI) in tests — especially when testing Angular services that use HttpClient, etc.

*/

// COURSE 9-10
/*

side notes use TestBed.Inject() NOT TestBed.Get()

theory
What is Dependency Injection/DI
    A design pattern used heavily in Angular.
        eg calculator service depends on logger service
        inject in constructor

We're gonna DI our calculator service, instead of initiating it
    so no more calulator=new CalculatorService...

steps
1. Import and Configure
    import { TestBed } from '@angular/core/testing';
    inside BeforeEach
        TestBed.configureTestingModule({
        providers: [
            CalculatorService,
            { provide: LoggerService, useValue: loggerSpy }
        ]
        });
        side notes
            CalculatorService, what we wanna test
            provide: LoggerService, the actual export name of LoggerService
            useValue: the mock implementation (our spy).

2. Init calculator with TestBed DI
    const calculator = TestBed.inject(CalculatorService);

Manual Instantiation vs TestBed, see next course
    Setup	
        You wire up dependencies manually	
        Angular wires up automatically
    DI token support	
        yes	
        no
    Angular internals (like Http)	
        ❌ must be mocked manually	
        ✅ TestBed can auto-provide
    Closer to real app behavior	
        ❌
        ✅

summary 
    TestBed is preferred, especially as tests grow in complexity or involve Angular internals (e.g. HttpClient, Router, etc.).
    Why DI Helps with Testing, more on later course
        It avoids relying on actual services that may have external dependencies (like HTTP calls), next course

*/
