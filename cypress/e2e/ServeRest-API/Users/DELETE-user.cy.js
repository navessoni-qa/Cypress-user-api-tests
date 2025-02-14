/// <reference types="cypress" />

describe('Delete User', () => {
    let userId;

    beforeEach(() => {
        cy.createUser().then((response) => {
            userId = response.body._id
        })
    })

    it('Delete existing user', () => {

        cy.deleteUser(userId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
        })
    })

    it('Delete user with undefined ID', () => {

        cy.deleteUser().then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message', 'Nenhum registro excluído')
        })
    })

    it('Delete user already deleted', () => {
        cy.listUsers().then((response) => {
            const userId = response.body.usuarios[14]._id;

            cy.deleteUser(userId).then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200)
                expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso')

                cy.deleteUser(userId).then((secondDeleteResponse) => {
                    expect(secondDeleteResponse.status).to.eq(200)
                    expect(secondDeleteResponse.body).to.have.property('message', 'Nenhum registro excluído')
                })
            })
        })
    })

    it('2 - Delete user already deleted', () => {

        cy.deleteUser(userId).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200)
            expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso')

            cy.deleteUser(userId).then((secondDeleteResponse) => {
                expect(secondDeleteResponse.status).to.eq(200)
                expect(secondDeleteResponse.body).to.have.property('message', 'Nenhum registro excluído')
            })
        })
    })

    it('Delete user with registered cart', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/usuarios/oAv3uh0Zxatsn1wz',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('message', 'Não é permitido excluir usuário com carrinho cadastrado')
                expect(response.body).to.have.property('idCarrinho', '8nP9jlgxEAsLF1Yq')
            })
        })
    })