/**
 * This is an example of an automated test.
 * Automated tests can be run by opening the /web/index_test.php page.
 *
 * The automated tests are run with Mocha: https://mochajs.org
 * The should/expect/assert syntax is provided by Chai: https://www.chaijs.com/
 * Furthermore, deep-equals (https://github.com/chaijs/deep-eql) and chai-jquery (https://github.com/chaijs/chai-jquery) are also included.
 */

describe('Page Switching Tests', () =>
{
	before(() =>
	{
		// reset cookies, initialize testing data, etc
		framework.open('/');
	});
	
	it('starts at /', () =>
	{
		expect(framework.page).to.be.equal('/');
	});
	
	it('clicked Test, went to /test', () =>
	{
		$('a:contains(Test)').click();
		expect(framework.page).to.be.equal('/test');
	});
	
	it('clicked Home, went back to /', () =>
	{
		$('a:contains(Home)').click();
		expect(framework.page).to.be.equal('/');
	});
});

describe('Some Example Tests', () =>
{
	it('async example passing', (done) =>
	{
		setTimeout(() =>
		{
			done();
		}, 500);
	});
	
	it('async example failing', (done) =>
	{
		setTimeout(() =>
		{
			done(new Error('This is a failing async test'));
		}, 500);
	});
	
	it('example timeout', (done) =>
	{
	});
	
	it('example longer timeout', (done) =>
	{
	}).timeout(2500);
});
