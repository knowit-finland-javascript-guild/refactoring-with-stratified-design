function isValid(field) {
  return field && field.length > 0;
}

export function checkErrors(fields) {
  const {
    title,
    contact_person: contactPerson,
    resourcetype = "",
    authors = [],
  } = fields;
  const invalidFields = [];

  if (!isValid(authors)) {
    invalidFields.push({
      step: 2,
      msg: "The dataset has no authors",
      level: "warning",
    });
  }
  if (!isValid(resourcetype)) {
    invalidFields.push({
      step: 0,
      msg: "Pick a type for the dataset",
      level: "error",
    });
  }
  if (!isValid(contactPerson)) {
    invalidFields.push({
      step: 3,
      msg: "At least one contact person is needed",
      level: "error",
    });
  }
  if (!isValid(title)) {
    invalidFields.push({
      step: 0,
      msg: "The dataset needs to have a name",
      level: "error",
    });
  }
  return invalidFields;
}
