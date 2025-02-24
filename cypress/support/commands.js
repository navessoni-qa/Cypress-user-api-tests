import { faker } from '@faker-js/faker/locale/pt_BR';

Cypress.Commands.add('createUser', (userData = null) => {
    const data = userData || {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
    }

    return cy.request({
        method: 'POST',
        url: '/usuarios',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('listUsers', () => {
    return cy.request({
        method: 'GET',
        url: '/usuarios',
        headers: {
            accept: 'application/json',
        },
        failOnStatusCode: false
    })

})

Cypress.Commands.add('listById', (userId) => {
    return cy.request({
        method: 'GET',
        url: `/usuarios/${userId}`, //ao invés de passar ID na URL, deixamos ela dinâmica
        headers: {
            accept: 'application/json',
        },
        failOnStatusCode: false
    })

})

Cypress.Commands.add('updateUser', (userId, userData = null) => {
    const data = userData || {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
    }

    return cy.request({
        method: 'PUT',
        url: `/usuarios/${userId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteUser', (userId, userData = null) => {
    const data = userData || {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
    }

    return cy.request({
        method: 'DELETE',
        url: `/usuarios/${userId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data,
        failOnStatusCode: false
    })
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })