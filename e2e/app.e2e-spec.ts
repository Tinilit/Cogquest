import { Platform.ClientPage } from './app.po';

describe('platform.client App', () => {
  let page: Platform.ClientPage;

  beforeEach(() => {
    page = new Platform.ClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
