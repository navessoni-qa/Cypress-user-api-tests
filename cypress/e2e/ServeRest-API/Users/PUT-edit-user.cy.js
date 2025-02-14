/// <reference types="cypress" />

describe('Edit User', () => {
    let userId;

    beforeEach(() => {
        cy.createUser().then((response) => {
            userId = response.body._id
        })
    })


    it('Edit existing user', () => {
        cy.updateUser(userId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
        })
    })

    it('Registers new user if ID not found', () => {
        cy.request({
            method: 'PUT',
            url: `https://serverest.dev/usuarios/1234`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                nome: 'Fulano da ',
                email: 'beltrano@master.com.pe',
                password: 'teste',
                administrador: 'true'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')
        })
    })

    it('Edit user with invalid email', () => {
        const invalidEmail = {
            email: 'beltrano@qa.com.u',
            nome: 'Beltrano',
            password: '1234',
            administrador: 'true'
        }
        cy.updateUser(userId, invalidEmail).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('Edit user with already registered email', () => {
        const registeredEmail = {
            email: 'beltrano@master.com.pe',
            nome: 'Fulano',
            password: 'teste',
            administrador: 'true'
        }

        cy.updateUser(userId, registeredEmail).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('message', 'Este email já está sendo usado')
        })
    })

    it('Edit user without a body', () => {
        const noData = {}

        cy.updateUser(userId, noData).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('nome', 'nome é obrigatório')
            expect(response.body).to.have.property('email', 'email é obrigatório')
            expect(response.body).to.have.property('password', 'password é obrigatório')
            expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
        })
    })

    it('Edit user with only email provided', () => {
        const partialData = {
            email: 'email@qa.com'
        }

        cy.updateUser(userId, partialData).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('nome', 'nome é obrigatório')
            expect(response.body).to.have.property('password', 'password é obrigatório')
            expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
        })
    })

    it('Edit user with only name provided', () => {
        const partialData = {
            nome: 'Fulano'
        }

        cy.updateUser(userId, partialData).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('email', 'email é obrigatório')
            expect(response.body).to.have.property('password', 'password é obrigatório')
            expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
        })
    })

    it('Edit user with only password provided', () => {
        const partialData = {
            password: '102030'
        }

        cy.updateUser(userId, partialData).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('email', 'email é obrigatório')
            expect(response.body).to.have.property('nome', 'nome é obrigatório')
            expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
        })
    })

    it('Edit user with only administrator provided', () => {
        const partialData = {
            administrador: 'true'
        }

        cy.updateUser(userId, partialData).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('email', 'email é obrigatório')
            expect(response.body).to.have.property('nome', 'nome é obrigatório')
            expect(response.body).to.have.property('password', 'password é obrigatório')
        })
    })

    it('Edit user with the same data', () => {
        const userData = {
            nome: 'Fulano da Silva',
            email: 'bel@qa.com',
            password: 'senha123',
            administrador: 'true'
        };

        cy.updateUser(userId, userData).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
        })
    })
})