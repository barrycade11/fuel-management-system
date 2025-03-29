const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser();
const xml = `<note><to>User</to><from>Admin</from><message>Hello!</message></note>`;
const jsonObj = parser.parse(xml);

console.log(jsonObj);