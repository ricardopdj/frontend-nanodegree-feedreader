/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            })
        });


        /* Loops through each feed
         * and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            })
        });
    });




    /* This suite is all about the slide-menu */
    describe('The menu', function() {
         /* Ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* Ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('menu clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This suite is all about the feed entries */
    describe('Initial Entries', function() {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('feed has entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });



    /* This suite is all about the feed content */
    describe('New Feed Selection', function() {
        var feed, newFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                feed = $('.feed').html();
            });

            loadFeed(1, function () {
                done();
            });
        });

        /* Ensures that the feed content actually changes. */
        it('feed content has changed', function(done) {
            newFeed = $('.feed').html();
            expect(newFeed).not.toEqual(feed);
            done();
        });
    });
}());
