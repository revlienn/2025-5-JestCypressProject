import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpTestingController } from "@angular/common/http/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should retrieve all courses", () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(12, "Error: incorrect number of courses");
      const course12 = courses.find((c) => c.id == 12);
      expect(course12.titles.description).toBe("Angular Testing Course");
    });

    const req = httpTestingController.expectOne("/api/courses");
    expect(req.request.method).toBe("GET");

    req.flush({ payload: Object.values(COURSES) });
  });
});
