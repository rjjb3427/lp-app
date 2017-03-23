import { LpAppPage } from './app.po';

describe('lp-app App', () => {
  let page: LpAppPage;

  beforeEach(() => {
    page = new LpAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('lp works!');
  });
});
