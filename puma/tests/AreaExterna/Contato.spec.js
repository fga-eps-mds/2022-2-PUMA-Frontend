import Contato from '../../src/components/AreaExterna/Contato/Contato'

describe('Get Contato data', () => {
    it('Should get contato data', () => {
        let response = {
            pagina: '/Contato',
            contatos: [
                {
                  nome: 'Departamento de Engenharia de Produção',
                  endereco: 'Sala DT-77/15, prédio da FT, bloco D UnB - Campus Universitário Darcy Ribeiro, Brasília - DF',
                  email: 'emaildopuma@unb.br',
                },
                {
                  nome: 'Administrador da plataforma 1',
                  endereco: '',
                  email: '121234567@unb.br',
                },
                {
                  nome: 'Professor responsavel 1',
                  endereco: '',
                  email: '981234567@unb.br',
                },
              ],
        };
        expect(Contato.data()).toStrictEqual(response);
    })
})
