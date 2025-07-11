import { fakeAsync, flush, tick } from '@angular/core/testing';

fdescribe('Async testing examples', () => {
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

    fit('Async test example - Plain promise', () => {
        let test = false;
        console.log('Creating promise');

        setTimeout(() => {
            console.log('Executing timeout');
        });

        Promise.resolve().then(() => {
            console.log('Executing promise');
            test = true;
        });

        console.log('Running test assertions');
        expect(test).toBeTruthy();
    });
});
