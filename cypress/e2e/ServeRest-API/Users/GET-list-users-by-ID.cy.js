/// <reference types="cypress" />

describe('User', () => {

    it('List users by ID', () => {
        cy.createUser().then((resUser) => {
            const userId = resUser.body._id;
            cy.listById(userId).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome')
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('password')
                expect(response.body).to.have.property('administrador')
                expect(response.body).to.have.property('_id', userId)
            })
        })
    })

    it('List user with invalid ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios/7kpkYJUIHZjGpFQH',
            headers: {
                accept: 'application/json',
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message', 'Usuário não encontrado')
        })
    })

    it('List deleted user by ID', () => {
        cy.deleteUser('userId').then(() => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/usuarios/userId',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('message', 'Usuário não encontrado')
            })
        })
    })
})