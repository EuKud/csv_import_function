Cypress.Commands.add('mockCsvUpload', (statusCode, message) => {
    cy.intercept('POST', '/upload', {
        statusCode: statusCode,
        body: { message: message },
    }).as('uploadCsv');
});

Cypress.Commands.add('uploadFile', (fileName) => {
    const filePath = 'cypress/fixtures/'

    if(fileName !== ''){
        cy.get('#csv-import').selectFile(`${filePath}${fileName}`);
    }
    
    cy.get('#submit-button').click();
});