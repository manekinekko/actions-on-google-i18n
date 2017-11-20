const i18n = require("../index");
const mockApp = {
  getUserLocale() {
    return "en-US";
  }
};
const directory = `${__dirname}/locales`;

describe("defaultExtention", () => {

  it("trigger a specific exception for an invalid defaultExtention", () => {
    const defaultExtension = `xxx`;
    const file = `${directory}/en-us.xxx`; // lowercase locale!!
    const expectedError = `[actions-on-google-i18n] file "${file}" does not exist.`;
    i18n.configure({ directory, defaultExtension }).use(mockApp);
    
    expect(() => mockApp.__("key")).toThrowError(expectedError);
  });
  
  it("load locales from a valid '.js' defaultExtention", () => {
    const defaultLocale = `js`;
    i18n.configure({ directory, defaultLocale }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toContain("value");
  });

  it("load locales from a valid '.json' defaultExtention", () => {
    const defaultLocale = `json`;
    i18n.configure({ directory, defaultLocale }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toContain("value");
  });

});