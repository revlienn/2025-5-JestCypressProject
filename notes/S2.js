// COURSE 12
/*

Target Service: CoursesService
Typical Angular HTTP service with methods like:
    findAllCourses()
    findCourseById()
    saveCourse()
    findLessons()
These methods use HttpClient, so real requests must be avoided in unit tests.

Step-by-Step: Setup for Testing CoursesService
1. Create Spec File
Create courses.service.spec.ts in the same folder as the service.

2. Write the Test Suite
describe('CoursesService', () => {
  // Tests will go here
});

3. Define Shared Variables
let service: CoursesService;
let httpTestingController: HttpTestingController;

4. Import Required Testing Modules
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

5. Setup TestBed in beforeEach()
    see the code

Explanation
provideHttpClientTesting
    Provides a mock HttpClient that does not hit real backends
    we're testing so we let the actual service does that
HttpTestingController	
    Allows you to intercept, mock, and assert HTTP calls
TestBed.inject(...)	
    Retrieves instances configured in the test module

What’s Next
You’re now ready to:
    Write specs that call methods like findAllCourses()
    Mock the HTTP request and respond with fake data
    Assert the results and verify HTTP behavior

*/

// COURSE 13
/*

want Test that CoursesService.findAllCourses():
    Sends a GET request to /api/courses
    Returns 12 course objects
    Includes a course with ID 12 that has the title "Angular Testing Course"

Step 1: Call the Method Under Test
Execute and subscribe CoursesService.findAllCourses().subscribe

Step 2: Assertions for the Response
Expects:
    Data exists (not null/undefined).
    Exactly 12 courses are returned.
    One of the courses has the expected title.
        init var for the course12 first

Step 3: Assertion the HTTP Request
Expects:
    One GET request was made to /api/courses.

Step 4: Simulate the Backend Response
Use the flush() method, feed mock data to subscribe() logic from Step 1.
    req.flush({
        payload: Object.values(CoURSES), // CoURSES is imported from your test data
    });

Step 5: Ensure Isolation and No Real Server Needed
Cmd, you can stop the server, tests still run bcos we dont use real server, we mock them
Confirm that no real HTTP requests are sent.
All data is mocked and controlled inside the test.

*/

// COURSE 14
/*

part Assert that findcoursebyid works

1. New it, "should find a course by id"
2. Execute service
3. Assert
    that it returns a result/truthy
    id is 12
    method is GET
4. Feed the data

summary HttpRequest service test
    execute > assert
    assert the method type eg GET
        careful with the link, need / at start
    feed data

part Assert we dont make any unintended http request 
option 1. add httpTestingController.verify(); after each flush in it
option 2. preferred, add inside afterEach()

*/

// COURSE 15
/*

want test savecourse/data modification request

1. New it, "should save the course data"
2. New var for the changes
    technically you can put it inside saveCourse as the parameter, but its too long, so i put it as a var
3. execute saveCourse and subscribe, assert 
    that the id is 12
    outside subscribe, the method is PUT, request body matches the changes var
4. feed the data
    the course AND the changes
    use object bcos thats the data format that Vasco made

*/

// COURSE 16
/*

want test save course, but handle if there's an error

1. New it, it("should produce an error if save course fails"
2. changes can be anything, its gonna be an error anyway
3. subscribe, notice empty the par, that'll error bcos subscribe should always has a par
4. fail it, refresh subscribe has next, complete and error, lets do error
    type is HttpErrorResponse, status 500, then statusText, we're gonna feed both
5. assert that it's PUT
6. feed the status and the text
    notice error needs a body and metadata
        "Save course failed" = body
        status and statusText = metadata

*/
