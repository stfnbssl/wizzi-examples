/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\plugins\gatsby-source-wizzi\highlightCode.js.ittf
*/
'use strict';
// credits https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-prismjs/src/highlight-code.js
const Prism = require('prismjs');
const _ = require('lodash');
const loadPrismLanguage = require('./loadPrismLanguage');
const unsupportedLanguages = new Set();
module.exports = (language, code, lineNumbersHighlight = [], noInlineHighlight = false) => {
    // (Try to) load languages on demand.
    if (!Prism.languages[language]) {
        try {
            loadPrismLanguage(language);
        } 
        catch (e) {
            // Language wasn't loaded so let's bail.
            let message = null;
            switch (language) {
                case 'none': {
                    return code;
                }
                case 'text': {
                    message = noInlineHighlight ? `code block language not specified in markdown.` : `code block or inline code language not specified in markdown.`;
                    break;
                }
                default: {
                    message = `unable to find prism language '${language}' for highlighting.`;
                }
            }
            const lang = language.toLowerCase();
            if (!unsupportedLanguages.has(lang)) {
                console.warn(message, `applying generic code block`);
                unsupportedLanguages.add(lang);
            }
            return _.escape(code);
        } 
    }
    const grammar = Prism.languages[language];
    const highlighted = Prism.highlight(code, grammar, language);
    return highlighted;
};
