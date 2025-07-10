// COURSE 18
/*

Material class change, updated on the right
    mat-tab-label => mdc-tab
    mat-tab-body-active  => mat-mdc-tab-body-active
    mat-card-title  => mat-mdc-card-title

*/

// COURSE 19-20
/*

want init setup, assert component has been init/truthy

sync component test
    sync? it has a sync input, then display it
        no async service, no http req
        most people dont test this, but we do bcos its a good starting point

    
1. beforeEach
    imports:[CoursesModule]
        technically, you only need to import whats in the template and script
            but thats time-consuming and can be too long
            so just import the module
                notice this is the positive side of module
            wanna do it one by one?
                imports: [
                    MatCardModule,
                    MatButtonModule,
                    RouterTestingModule
                ],
    compile, it returns a promise
    then

2. init variables
    the component itself
    the component's fixture

3. back to beforeEach
    component & fixture init
        fixture with the component
        then for the component, assign the instance
            long steps i know, its just how its done
    waitForAsync, imports from angular core testing
        wrap everythin in beforeEach with this, otherwise error, bcos the it block will be executed before the beforeEach where we init the component and its fixture

4. assert the component truthy
    console log output is the comps' output/courseEdited, and whats injected to the constructor, MatDialog


*/

// COURSE 21
/*

want assert it displays the course list, by quierying the dom/dom interaction

1. var and beforeEach
    init el, type is debug element
    assign fixture.debugelement inside beforeEach

2. feed the data
    inside the it spec, feed the data, assign to a var cards
        Vasco premade the function
    assert cards to be truthy
    assert length is 12
        at this point: Expected 0 to be 12, 'ERROR: Incorrect number of cards'.

2b. fetch DOM element that'll have the data
    query by css, .course-card

COURSE 22

3. debug, print the state of the HTML at certain point in time
    console.log(el.nativeElement.outerHTML)
    at this point: mat-card doesnt exist

4. Trigger the detect change mechanism, to update the DOM
    after feeding, fixture.detectChanges();
        it render updates to the DOM
    this is sync process, not async

notice i missed note-taking for 2b earlier, it about fetching DOM element

*/

// COURSE 23
/*

want assert it displays the first element

1. feed the data, detect DOM changes
2. init var
    data for the first course
    dom that'll display the first course
    dom of first courses' title
    dom of first courses' image
3. assert
    truthy
    titles, same as from the data
    image src, same as from the data

side notes
    for DOM, must use .nativeElement
    other options: parents, children, listeners
    console log title result
        <mat-card-title _ngcontent-a-c3832827993="" class="mat-mdc-card-title">Angular Testing Course</mat-card-title>

*/

// COURSE 24
/*

side notes
    if you add .TODO at the end of the filename extension, it'll be deactivated

smart/container component
    fetches data from service to be displayed
    eg home component fetches data from coursesService, then feeds it to the courses-card-list, which is a presentational component
    so home fetches, while its child courses-card-list displays

1. home spec file, remove .TODO to activate
2. vars init, outside beforeEach
    the component, component fixture, and debug element
3. beforeEach
    wrap in waitForAsync, imports from angular core testing
    imports
        course module
        noon animation module

4. mock the service, create a spy
    we arent going to make an actual http request, so mock it
    var for the coursesServiceSpy
        name it CoursesService
        method we're gonna call, findAllCourses
    add providers object after imports
        provide: the service class
        useValue: our spy object

5. compile components, then
    init the fixture, component and el

6. new it, 'should create the component'
    assert truthy

stop current ng test, restart

*/

// COURSE 25
/*

context
    course data fetched by home comp has category props, 
        values: beginner and advanced
    each displayed by an ng-container with if, containing a tab
        !beginner course==tab wont be displayed
want
    feed beginner course, assert its the only tab shows up

1. Init var coursesService, inject inside then
    var type is any
    inside then, inject with testbed

2. Init var for beginnerCourses
    execute setup courses, then filter

3. new it, 'should display only beginner courses'
    execute mock coursesService, return observable
        why observable ? 
            because the home component expects an observable
            plus the service findAllCourses also returns an observable
                for test, we have to be as close as possible to the real behavior
        from courses service, findAllCourses
            findAllCourses(): Observable<Course[]> notice the return type
        from home comp ts
            beginnerCourses$: Observable<Course[]>; notice type
            const courses$ = this.coursesService.findAllCourses();
            this.beginnerCourses$ = this.filterByCategory(courses$, 'BEGINNER');

    detect changes
    query the tab
        notice new class is mat-mdc-tab
    expect only one

side notes
.and.returnValue ,why? because without it
    It returns a Jasmine spy function, but Does nothing by default.
        Returns undefined if called.
        Tracks if/when/how it was called.

    // Just inspecting it
    console.log(serviceSpy.findAllCourses); // Logs the spy function itself

    // Calling it
    const result = serviceSpy.findAllCourses(); // ✅ result === undefined
    console.log(result); // undefined

    // But it tracks calls:
    expect(serviceSpy.findAllCourses).toHaveBeenCalled(); // can still assert

    in short, wanna get value? use .and.returnValue

*/

// COURSE 26
/*

want
    feed ADVANCED course, assert its the only tab shows up
solution
    outside beforeEach, new var for the advancedCourses
    it, copy paste the rest of the code from beginner, change the of(...)

want
    it, copy paste the rest of the code from beginner, 
    of should be setupCourses()
    careful, number of tabs is now 2

*/

// COURSE 27
/*

want when clicking either beginner/advanced, mat-card displayed should only be that category

1. feed data, detect changes
2. assert that there are 2 tabs
3. simulate click, detect changes
    default code
        tabs[1].triggerEventHandler('click', { button: 0 });
        button 0 == left click
        button 2 == right click
        'dblclick',button 0 for double click
4. fetch all of the titles, assert >0
5. assert title containing one of the advanced
    notice dont panic, it fails even tho you detect changes after click due to some async thing, next course, section 4

*/

// COURSE 28 - SECTION 4
/*

why does it fail?
    material use an animation when switching between tabs, takes 200ms
    we didnt put this into consideration

solution 1. add all expect into setTimeout
    passed the test BUT this is a false pass
    there's no expect in the main block, so jasmine consider it completed
        notice WITHOUT testing expect inside the setTimeout
    so atm jasmine inspect main block > no expect so pass it > setTimeout hits 500ms > expect fails but jasmine already passed it
        setTimeout is also async, just like setInterval or fetch http
    hence a false pass

solution 2 done:DoneFn
1. inside it par, add done:DoneFn
    done tells Jasmine to execute sync code, THEN execute the async eg setTimeout block
2. setTimeout last line
    done()
    now you get a real pass

setTimeout is not a typical solution tho, see next course

*/
