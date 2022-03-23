function xxxx() {}

function validateAuthors(authors) {
  if (authors.length !== 0) {
    return {
      step: 2,
      msg: "The dataset has no authors",
      level: "warning",
    };
  }
}

function validateResourceType() {}

function validateContactPerson() {}

function validateTitle() {}

export function checkErrors(fields) {
  const {
    title,
    contact_person: contactPerson,
    resourcetype = "",
    authors = [],
  } = fields;
  const invalidFields = [];

  const errorMessages = {
    authors: { step: 2, msg: "The dataset has no authors", level: "warning" },
    resourcetype,
    contactPerson,
  };

  const arrayOfRules = [];

  if (!validateAuthors(authors)) {
    invalidFields.push({
      step: 2,
      msg: "The dataset has no authors",
      level: "warning",
    });
  }

  if (!resourcetype) {
    invalidFields.push({
      step: 0,
      msg: "Pick a type for the dataset",
      level: "error",
    });
  }
  if (!contactPerson || contactPerson.length === 0) {
    invalidFields.push({
      step: 3,
      msg: "At least one contact person is needed",
      level: "error",
    });
  }
  if (!title) {
    invalidFields.push({
      step: 0,
      msg: "The dataset needs to have a name",
      level: "error",
    });
  }
  return invalidFields;
}
