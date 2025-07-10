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

// COURSE 21-22
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

*/
