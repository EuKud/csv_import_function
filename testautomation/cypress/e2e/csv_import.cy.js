describe('CSV Import Function', () => {
  const prefixFilePath = 'cypress/fixtures/';

  // Messages to show for different situations
  const messages = {
    success: "Import successful.",
    noFile: "No file selected",
    invalidType: "Invalid file type, please upload only CSV files.",
    fileTooLarge: "File exceeds the maximum allowed file size limit.",
    noData: "No data available.",
    missingColumn: "Missing columns in the CSV file.",
    wrongColumn: "Incorrect column format.",
    invalidDataType: "Invalid data type in one or more columns.",
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
});