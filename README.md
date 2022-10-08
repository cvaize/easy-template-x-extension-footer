# easy-template-x-extension-footer

## Attention!!! This functionality is already implemented in easy-template-x:^3.

Extension for package easy-template-x, only for nodejs, and only for `TextPlugin`!

`npm i easy-template-x-extension-footer`

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
