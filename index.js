const { Docx, TemplateExtension } = require('easy-template-x');

const HEADER_TYPE = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header';
const FOOTER_TYPE = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer';

module.exports = class FooterExtension extends TemplateExtension{
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    execute = async (data, context) => {
        const compiler = this.utilities.compiler;
        const xmlRefs = await context.docx.rels.zip.getFile(context.docx.rels.relsFilePath).getContentText();
        const rels = this.utilities.xmlParser.parse(xmlRefs);

        for (let i = 0; i < rels.childNodes.length; i++) {
            const child = rels.childNodes[i];
            if((child.attributes.Type === HEADER_TYPE || child.attributes.Type === FOOTER_TYPE)){
                const target = `word/${child.attributes.Target}`;

                if(context.docx.zip.isFileExist(target)){
                    const xmlDocument = await context.docx.zip.getFile(target).getContentText();
                    const document = context.docx.xmlParser.parse(xmlDocument);
                    const docx = new Docx(context.docx.zip, context.docx.xmlParser);
                    docx._documentPath = target;
                    docx._document = document;
                    const newContext = { docx };
                    await compiler.compile(document, data, newContext);
                    await docx.saveChanges();
                }
            }
        }

    };
};

