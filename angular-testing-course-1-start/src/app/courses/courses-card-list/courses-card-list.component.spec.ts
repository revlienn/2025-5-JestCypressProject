import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';

describe('CoursesCardListComponent', () => {
    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CoursesModule],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CoursesCardListComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
        console.log(component);
    });

    it('should display the course list', () => {
        component.courses = setupCourses();
        fixture.detectChanges();

        console.log(el.nativeElement.outerHTML);

        const cards = el.queryAll(By.css('.course-card'));

        expect(cards).toBeTruthy('ERROR: cards does not exist');
        expect(cards.length).toBe(12, 'ERROR: Incorrect number of cards');
    });

    it('should display the first course', () => {
        pending();
    });
});
