/// <reference types="cypress" />

describe('Login', () => {

    it('Login with valid credentials', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'fulano@qa.com',
                password: 'teste'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'Login realizado com sucesso')
            expect(response.body).to.have.property('authorization')
        })

    })

    it('Login with invalid credentials', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'fulano11111@qa.com',
                password: '123456'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('message','Email e/ou senha inválidos')
       
        })

    })
})