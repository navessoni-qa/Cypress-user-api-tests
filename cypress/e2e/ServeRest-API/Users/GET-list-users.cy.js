/// <reference types="cypress" />

describe('User', () => {

    it('List users', () => {
        cy.listUsers().then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('quantidade').to.be.greaterThan(0)
            expect(response.body.usuarios).to.be.an('array')
            cy.wrap(response.body.usuarios).as('userList')
        })
    })

    it('Validate user by index', () => {
        cy.listUsers().then((response) => {
            const firstUser = response.body.usuarios[2]

            expect(firstUser).to.have.property('nome', 'Jose')
            expect(firstUser).to.have.property('email', 'email22@email.com')
            expect(firstUser).to.have.property('password', 'teste')
            expect(firstUser).to.have.property('administrador', 'false')
            expect(firstUser).to.have.property('_id', '03d8k2RR9InNtnIO')
        })
    })

    it('List users by ID', () => {
        cy.createUser().then((resUser) => {
            const userId = resUser.body._id;
            cy.listById(userId).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('nome')
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('password')
                expect(response.body).to.have.property('administrador')
                expect(response.body).to.have.property('_id',userId)
            })
        })
    })
})