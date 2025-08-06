const axios = require('axios');

const baseURL = 'http://api-geral:3000';

async function runTests() {
  // Teste de criação de usuário
  const userData = {
    name: 'Teste User',
    email: `teste${Date.now()}@email.com`,
    password: 'senha123'
  };
  const createRes = await axios.post(`${baseURL}/user`, userData);
  console.log('Usuário criado:', createRes.data);

  // Teste de busca por todos os usuários
  const allRes = await axios.get(`${baseURL}/user`);
  console.log('Todos usuários:', allRes.data);

  // Teste de busca por id
  const idRes = await axios.get(`${baseURL}/user`, { params: { id: createRes.data.id } });
  console.log('Busca por id:', idRes.data);

  // Teste de busca por nome
  const nameRes = await axios.get(`${baseURL}/user`, { params: { name: userData.name } });
  console.log('Busca por nome:', nameRes.data);

  // Teste de busca por email
  const emailRes = await axios.get(`${baseURL}/user`, { params: { email: userData.email } });
  console.log('Busca por email:', emailRes.data);
}

runTests().catch(err => {
  if (err.response) {
    console.error('Erro:', err.response.data);
  } else {
    console.error('Erro:', err.message);
  }
});
