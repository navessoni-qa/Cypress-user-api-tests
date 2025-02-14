# Cypress User Management Tests

This repository contains automated user management tests using the Cypress testing framework. The tests cover scenarios for creating, editing, listing, deleting users, and performing login, including validations for required fields and different API responses.

These tests are part of a **Automation MasterClass Mentorship** led by **Alexandre Silva**, focusing on best practices for test automation.

## Technologies Used
- **Cypress**: End-to-end (E2E) testing tool for automation.
- **JavaScript**: The language used for writing the tests.
- **ServeRest API**: API used to test user management functionalities (https://serverest.dev/)

## Tested Features

### 1. User Creation
- **Register a new user**: Creates a user with valid data.
- **Validate already registered email**: Tests the response when attempting to create a user with an email that is already in use.
- **Registration without required fields**: Validates errors when required fields such as name, password, admin status, or email are missing.

### 2. User Editing
- **Edit an existing user**: Updates an existing user with new valid data.
- **Edit user with invalid email**: Tests the validation for an invalid email during the user update.
- **Edit user with already registered email**: Checks if the system returns an error when attempting to update the email to one that is already registered.
- **Edit user without providing all required fields**: Tests the behavior when editing a user while only providing the email field.
- **Edit user with invalid ID**: Validates the response when trying to update a user with a non-existent or malformed ID.
- **Edit user without body**: Checks if the system returns an error when sending an update request without providing the required data in the request body.
- **Edit a user that has been deleted**: Tests the behavior when attempting to edit a user that has already been deleted.

### 3. User Listing
- **List users**: Verifies that the user list is returned successfully, checks if the quantity is greater than zero, and validates that the response contains an array of users.
- **Validate user by index**: Validates the specific details (name, email, password, admin status, and ID) of a user at a specific index in the user list.

### 4. User Listing by ID
- **List user with valid ID**: Verifies that an existing user can be listed correctly.
- **List user with invalid ID**: Validates the API's response when attempting to list a user with a non-existent ID.
- **List deleted user by ID**: Checks the API's response when trying to list a user that has already been deleted.

### 5. User Deletion
- **Delete an existing user**: Successfully deletes a user.
- **Delete a user already deleted**: Checks the response when trying to delete a user that has already been deleted.
- **Delete user with associated cart**: Validates the behavior when attempting to delete a user that has an associated cart.

### 6. User Login
- **Login with valid credentials**: Verifies that a user can successfully log in with valid email and password. Checks if the API responds with a success message and returns an authorization token.
- **Login with invalid credentials**: Validates the API's response when attempting to log in with incorrect email or password.

## Prerequisites

To run the tests in this repository, you will need:

1. **Node.js** (version 12 or higher)
2. **Cypress** (installed globally or locally in the project)

## How to Run the Tests

1. Clone the repository:

```git clone https://github.com/your-username/cypress-user-management-tests.git```

2. Install the dependencies:

```npm install```

3. Run the tests:

```npx cypress open```

This will open the Cypress graphical interface, where you can run the tests. Alternatively, you can run the tests in headless mode (without the GUI) using:

```npx cypress run```


## Folder Structure

- `cypress/e2e/ServeRest-API`: Contains the test files organized by functionality (editing, creating, listing, login and deleting users).
- `cypress/fixtures`: Example data files used in the tests, if applicable.
- `cypress/support`: Contains custom commands and helper functions used in the tests.

## Contributing

If you would like to contribute to this project, feel free to open issues or submit pull requests.