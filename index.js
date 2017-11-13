class I18n {
    configure(options = {}) {

        if (!options.directory) {
            throw new Error(' "directory" is not valid. Please provide a directory of your locales.');
        }

        this.directory = options.directory;
        this.defaultLocale = options.defaultLocale || "en-us";

        return this;
    }
    use(app) {
        let locale = app.getUserLocale();

        if (locale) {
          locale = locale.toLowerCase();
        }
        else {
          locale = this.defaultLocale;
        }

        app.__ = (key, context = {}) => {
            const locales = require(`${this.directory}/${locale}`);
            let translation = locales[key];

            if (translation) {
                for (let ctxKey in context) {
                    translation = translation.replace('{' + ctxKey + '}', context[ctxKey]);
                }
            }

            return translation;
        }
    }
}

module.exports = new I18n();