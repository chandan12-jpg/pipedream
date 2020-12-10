const startCase = require("lodash/startCase");

const common = require("../../common-instant");

module.exports = {
  ...common,
  name: "Object Updated (Instant, of Selectable Type)",
  key: "salesforce-object-updated-instant",
  description: `
    Emit an event immediately after an object of arbitrary type
    (selected as an input parameter by the user) is updated
  `,
  version: "0.0.1",
  methods: {
    ...common.methods,
    generateMeta(data) {
      const nameField = this.db.get("nameField");
      const {
        New: newObject,
      } = data.body;
      const {
        LastModifiedDate: lastModifiedDate,
        Id: id,
        [nameField]: name,
      } = newObject;
      const entityType = startCase(this.objectType);
      const summary = `${entityType} updated: ${name}`;
      const ts = Date.parse(lastModifiedDate);
      const compositeId = `${id}-${ts}`;
      return {
        id: compositeId,
        summary,
        ts,
      };
    },
    getEventType() {
      return "updated";
    },
  },
};
