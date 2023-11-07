class CodeBuilder {
  constructor(className) {
    this.fields = [];
    this.name = className;
  }

  addField(name) {
    this.fields.push(name);
    return this;
  }

  toString() {
    let res = [];
    res.push(`class ${this.name} \{\n`);
    if (this.fields.length > 0) {
      res.push(`  constructor(`);
    }
    for (let i = 0; i < this.fields.length; ++i) {
      if (i != this.fields.length - 1) {
        res.push(`${this.fields[i]}, `)
      } else {
        res.push(`${this.fields[i]}) \{\n`);
      }
    }
    for (let field of this.fields) {
      res.push(`    this.${field} = ${field};\n`);
    }
    if (this.fields.length > 0) {
      res.push(`  }\n`);
    }
    res.push(`}`);
    return res.join('');
  }
}

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());
