const fs = require('node:fs');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

fs.readFile('./Public/Uploads/SH NB SLT STO TOMAS BINAN COSS_2025-02-24_transactions.xml', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const parser = new XMLParser();
    let jObj = parser.parse(data);

    // const builder = new XMLBuilder();
    // const xmlContent = builder.build(jObj);
    for (let item of jObj.ArrayOfTransaction.Transaction) {
        console.log(item);
    }
});
