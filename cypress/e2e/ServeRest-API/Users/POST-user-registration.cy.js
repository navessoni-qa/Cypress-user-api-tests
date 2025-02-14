/// <reference types="cypress" />

describe('User', () => {

    it('Register a new user', () => {
        cy.createUser().then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')
            cy.wrap(response).as('usedId')
        });
    });


    it('Validate message for already registered email', () => {
        const userData = {
            nome: 'João da Silva',
            email: 'abacate1@qa.com.br',
            password: '123456',
            administrador: 'true'
        }

        cy.createUser(userData).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message', 'Este email já está sendo usado')
        })
    })

    it('Registration without required fields', () => {
        const noData = {}

        cy.createUser(noData).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('nome', 'nome é obrigatório')
            expect(response.body).to.have.property('email', 'email é obrigatório')
            expect(response.body).to.have.property('password', 'password é obrigatório')
            expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
        })
    })
})