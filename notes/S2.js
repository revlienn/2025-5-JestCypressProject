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
