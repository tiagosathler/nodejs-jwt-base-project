const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chaiHttp = require('chai-http');

// const {
//   // sequelize,
//   // dataTypes,
//   // checkModelName,
//   // checkUniqueIndex,
//   makeMockModels,
// } = require('sequelize-test-helpers');

const server = require('../src/api/app');

// Importação do modelo original, contido em `models`, a partir da raiz, em `/src`
const { User } = require('../src/models');
// Importação do mock utilizado nesse contexto
const { User: userMock } = require('./mock/models');

chai.use(chaiHttp);
const { expect } = chai;

describe('Rota /api/users/:id', () => {
  const ENDPOINT_USER_NOT_FOUND = '/api/users/100';
  const ENDPOINT_USER_FOUND = '/api/users/1';
  const ENDPOINT_LOGIN = '/api/login';

  const fakeUser = {
    id: 1,
    username: 'Saul Reixas',
   };

  before(() => {
    sinon.stub(User, 'findOne').callsFake(userMock.findOne);
    sinon.stub(User, 'findByPk').callsFake(userMock.findByPk);
  });
    
  after(() => {
    User.findOne.restore();
    User.findByPk.restore();
  });
    
  describe.only('requisição com token válido e quando a pesquisa não encontra o usuário', () => {
    let result;
  
    before(async () => {
      const { body: { token } } = await chai
        .request(server)
        .post(ENDPOINT_LOGIN)
        .send({ 
          '_method': 'post',
          'username': 'Saul Reixas',
          'password': 'tocasaul',
        });
        
      result = await chai
        .request(server)
        .get(ENDPOINT_USER_NOT_FOUND)
        .set('authorization', token);
    });

    after(() => {
      result = undefined;
    });
    
    it('Essa requisição deve retornar código de status 404', () => {
      expect(result).to.have.status(404);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(result.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(result.body).to.have.property('message');
    });

    it('A propriedade "message" possui o texto "Usuário não encontrado"', () => {
      expect(result.body.message).to.be.equal(
        'Usuário não encontrado',
      );
    });
  });

  describe.only('requisição com token válido e quando a pesquisa não encontra o usuário', () => {
    let result;
  
    before(async () => {
      const { body: { token } } = await chai
        .request(server)
        .post(ENDPOINT_LOGIN)
        .send({ 
          '_method': 'post',
          'username': 'Saul Reixas',
          'password': 'tocasaul',
        });
        
      result = await chai
        .request(server)
        .get(ENDPOINT_USER_NOT_FOUND)
        .set('authorization', token);
    });

    after(() => {
      result = undefined;
    });
    
    it('Essa requisição deve retornar código de status 404', () => {
      expect(result).to.have.status(404);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(result.body).to.be.an('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(result.body).to.have.property('message');
    });

    it('A propriedade "message" possui o texto "Usuário não encontrado"', () => {
      expect(result.body.message).to.be.equal(
        'Usuário não encontrado',
      );
    });
  });

 
});
