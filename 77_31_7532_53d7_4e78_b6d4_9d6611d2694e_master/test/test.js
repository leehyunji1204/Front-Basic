const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');
var driver;

let container, prev, next, indicators, slide;

const options = new chrome.Options();
options.addArguments(
    'headless'
);

describe('Image carousel test', function() {
    this.timeout(100000);

    before(function(done) {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        driver.get('http://localhost:8001')
            .then(() => {
                done();
            });
    });

    after(function() {
        driver.quit();
    })

    beforeEach(async function() {
        driver.navigate().refresh();
    })

    it('carousel should show the 1st image from the list by default', async function() {
        driver.sleep(2000);
        const image = await driver.findElement(By.id("carousel-img"));
        const imageSrc = await image.getAttribute('src');
        expect(imageSrc).to.contains('img-1.jpg');
    });

    it('Clicking on previous button should show the previous image', async function() {
        prev = await driver.findElement(By.id("previous"));
        next = await driver.findElement(By.id("next"));
        await next.click();
        await prev.click();
        const image = await driver.findElement(By.id("carousel-img"));
        const imageSrc = await image.getAttribute('src');
        expect(imageSrc).to.contains('img-1.jpg');
    });

    it('Clicking on next button should show the next image', async function() {
        next = await driver.findElement(By.id("next"));
        await next.click();
        const image = await driver.findElement(By.id("carousel-img"));
        const imageSrc = await image.getAttribute('src');
        expect(imageSrc).to.contains('img-2.jpg');
        driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('next-click-view.png', image, 'base64', function(err) {});
            }
        );
    });

    //indicators = await driver.findElement(By.className("indicator-list"));

    it('Clicking on next button in the last item should show the first image', async function() {
        next = await driver.findElement(By.id("next"));
        await next.click();
        await next.click();
        await next.click();
        await next.click();
        await next.click();
        const image = await driver.findElement(By.id("carousel-img"));
        const imageSrc = await image.getAttribute('src');
        expect(imageSrc).to.contains('img-1.jpg');
    });

    it('Clicking on previous button in the first item should show the last image', async function() {
        prev = await driver.findElement(By.id("previous"));
        await prev.click();
        const image = await driver.findElement(By.id("carousel-img"));
        const imageSrc = await image.getAttribute('src');
        expect(imageSrc).to.contains('img-5.jpg');
    });

    it('Clicking on any indicator icon should show the appropriate image', async function() {
        driver.sleep(2000);
        let indicator2 = await driver.findElement(By.id("two"));
        indicator2.click();
        const image = await driver.findElement(By.id("carousel-img"));
        const imageSrc = await image.getAttribute('src');
        expect(imageSrc).to.contains('img-2.jpg');
        driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('second-indicator-click.png', image, 'base64', function(err) {});
            }
        );
    });
});