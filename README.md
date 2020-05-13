# easy-template-x-extension-footer

Extension for package easy-template-x, only for nodejs, and only for `TextPlugin`!

```javascript
const FooterExtension = require('easy-template-x-extension-footer');

const handler = new TemplateHandler({
    extensions: {
        afterCompilation: [
            new FooterExtension()
        ]
    }
});
```
