describe('CSV Import Function', () => {
  const prefixFilePath = 'cypress/fixtures/';

  // Messages to show for different situations
  const messages = {
    noFile: "No file selected",
    success: "Import successful.",
    noData: "No data available.",
    invalidType: "Invalid file type, please upload only CSV files.",
    missingColumn: "Missing columns in the CSV file.",
    wrongColumn: "Incorrect column format.",
    invalidDataType: "Invalid data type in one or more columns.",
    fileTooLarge: "File exceeds the maximum allowed file size limit.",
    requiredFields: "Required fields are missing in the CSV file.",
    duplicateRecords: "Duplicate records found.",
    nullValue: "NULL values found in records."
  };

  beforeEach(() => {
    cy.visit('/csv-import');
  });

  it('TC-01: Upload a file without selecting one and show an error message', () => { 
    cy.mockCsvUpload(400, messages.noFile);

    cy.uploadFile('');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.noFile).should('be.visible');
    });
  });

  it('TC-02: Upload a correctly formatted CSV file and show a success message', () => {
    cy.mockCsvUpload(200, messages.success);

    cy.uploadFile('temp_data_success.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 200);
      cy.get('#messageField').contains(messages.success).should('be.visible');
    });
  });

  it('TC-03: Upload an empty CSV file and show an error message', () => {
    cy.mockCsvUpload(400, messages.noData);

    cy.uploadFile('temp_data_empty.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.noData).should('be.visible');
    });
  });

  it('TC-04: Upload an invalid file type and show an error message', () => {
    cy.mockCsvUpload(400, messages.invalidType);

    cy.uploadFile('temp_data.txt');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.invalidType).should('be.visible');
    });
  });

  it('TC-05: Upload a CSV file with missing columns and show an error message', () => {
    cy.mockCsvUpload(400, messages.missingColumn);

    cy.uploadFile('temp_data_missing_column.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.missingColumn).should('be.visible');
    });
  });

  it('TC-06: Upload a CSV file with incorrect column format and show an error message', () => {
    cy.mockCsvUpload(400, messages.wrongColumn);

    cy.uploadFile('temp_data_wrong_column.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.wrongColumn).should('be.visible');
    });
  });

  it('TC-07: Upload a CSV file with invalid data types and show an error message', () => {
    cy.mockCsvUpload(400, messages.invalidDataType);

    cy.uploadFile('temp_data_wrong_datatype.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.invalidDataType).should('be.visible');
    });
  });

  it('TC-08: Upload a large CSV file and show an error message', () => {
    cy.mockCsvUpload(400, messages.fileTooLarge);

    cy.uploadFile('temp_data_big.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.fileTooLarge).should('be.visible');
    });
  });

  it('TC-09: Upload a CSV file with missing required fields and show an error message', () => {
    cy.mockCsvUpload(400, messages.requiredFields);

    cy.uploadFile('temp_data_required_field.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.requiredFields).should('be.visible');
    });
  });

  it('TC-10: Upload a CSV file with duplicate records and show an error message', () => {
    cy.mockCsvUpload(400, messages.duplicateRecords);

    cy.uploadFile('temp_data_duplicate_records.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.duplicateRecords).should('be.visible');
    });
  });

  it('TC-11: Upload a CSV file with NULL values and show an error message', () => {
    cy.mockCsvUpload(400, messages.nullValue);

    cy.uploadFile('temp_data_null_value.csv');

    cy.wait('@uploadCsv').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 400);
      cy.get('#messageField').contains(messages.nullValue).should('be.visible');
    });
  });
});