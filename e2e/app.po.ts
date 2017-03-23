import { browser, element, by } from 'protractor';

export class LpAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('lp-root h1')).getText();
  }
}
