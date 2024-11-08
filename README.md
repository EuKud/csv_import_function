# CSV Import Function
This project contains automated tests for the CSV import feature in a web application. The tests are created using [Cypress](https://www.cypress.io/), a JavaScript testing framework.

## Prerequisites

Make sure you have installed:

- [`Node.js`](https://nodejs.org/) version 20.14.0
- [`npm`](https://www.npmjs.com/) version 10.8.1
- [`Cypress`](https://www.cypress.io/) version 13.15.2 (will install automatically with `npm install`)
- [`http-server`](https://www.npmjs.com/package/http-server) version 14.1.1 (to run a local server for the UI)

## Project Setup

Follow these steps to set up and run the tests:

1. **Navigate to the Test Directory**  
   In your terminal, go to the `testautomation` directory:
   ```bash
   cd testautomation
   ```

2. **Install Dependencies**  
   Run this command to install all required dependencies:
   ```bash
   npm install
   ```

3. **Start the Web Application**  
   To start the application for testing, use `http-server` to serve files from the `minimal_ui` directory. By default, this command will run the server on port 8080:
   ```bash
   npx http-server ../minimal_ui
   ```
   - Make sure the server is running before running the tests.
   - The app will be available at `http://localhost:8080`.

4. **Run Cypress Tests**

   To run the Cypress tests, you have two options:

   - **Run with the Cypress GUI**:

     To open the Cypress Test Runner, where you can select and run individual tests in the graphical interface, use the following command:
     ```bash
     npm run cy:open
     ```

     This command will launch the Cypress GUI, allowing you to interact with the tests and see the results in real time.

   - **Run Cypress in Headless Mode**:

     If you prefer to run the tests in the background without the GUI, use the following command:
     ```bash
     npm run cy:run
     ```

     This will execute all the tests in headless mode (without the graphical interface) and show the results in the terminal. It is faster and doesn't require a browser window to be opened.

## Available Commands

| Command                    | Description                                    |
|----------------------------|------------------------------------------------|
| `npm install`              | Installs all necessary dependencies.           |
| `npx http-server ../minimal_ui` | Starts the web server on port 8080 for the UI. |
| `npm run cy:open`          | Opens the Cypress test runner GUI.             |
| `npm run cy:run`           | Run the Cypress tests without GUI.             |

## Test Scenarios

The tests cover different scenarios for the CSV import function, such as:

- Uploading a valid CSV file
- Handling errors for incorrect file types, empty files, missing columns, and more

## Additional Notes

- Make sure the web server is running on port 8080 before starting the tests.