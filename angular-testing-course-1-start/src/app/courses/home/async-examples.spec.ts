import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of, delay } from 'rxjs';

describe('Async testing examples', () => {
    it('Async test - done()', (done: DoneFn) => {
        let test = false;

        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 500);
    });

    it('Async test - setTimeout()', fakeAsync(() => {
        let test = false;
        setTimeout(() => {});
        setTimeout(() => {
            console.log('running assertions-fakeAsync');
            test = true;
        }, 500);

        //tick(500);
        flush();
        expect(test).toBeTruthy();
    }));

    it('Async test example - Plain promise', fakeAsync(() => {
        let test = false;
        console.log('Creating promise');

        Promise.resolve()
            .then(() => {
                console.log('Executing promise');
                test = true;
                return Promise.resolve();
            })
            .then(() => {
                console.log('Executing promise #2');
            });

        flushMicrotasks();

        console.log('Running test assertions');
        expect(test).toBeTruthy();
    }));

    it('Async test - Promise and setTimeout', fakeAsync(() => {
        console.log('Async test - Promise and setTimeout');
        let number = 0;

        Promise.resolve().then(() => {
            console.log('Promise executed');

            number += 10;

            setTimeout(() => {
                console.log('setTimeout executed');
                number++;
            }, 1000);
        });

        expect(number).toBe(0);

        flushMicrotasks();
        expect(number).toBe(10);
        console.log('flushMicrotasks');

        tick(1000);
        expect(number).toBe(11);
        console.log('tick 1000');
    }));

    it('Async test - Observables', fakeAsync(() => {
        let test = false;

        console.log('Creating observable');

        const test$ = of(test);

        // test$.subscribe(() => {
        //     console.log('Changing observable value');
        //     test = true;
        // });

        test$.pipe(delay(1000)).subscribe(() => {
            console.log('Changing observable value');
            test = true;
        });

        tick(1000);

        console.log('Running test assertion');
        expect(test).toBeTruthy();
    }));
});
