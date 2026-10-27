const токен = 'mock-jwt-token';

module.exports = (запрос, ответ, далее) => {
  ответ.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  ответ.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  ответ.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (запрос.method === 'OPTIONS') {
    ответ.status(204).end();
    return;
  }

  const задержка = Math.floor(Math.random() * 801) + 200;

  setTimeout(() => {
    if (запрос.path === '/api/auth/token') {
      ответ.status(200).json({
        token: токен,
        tokenType: 'Bearer',
      });
      return;
    }

    if (запрос.path === '/api/users' && запрос.method === 'GET') {
      далее();
      return;
    }

    if (!запрос.path.startsWith('/api/')) {
      далее();
      return;
    }

    if (запрос.headers.authorization !== `Bearer ${токен}`) {
      ответ.status(401).json({
        error: 'Недействительный токен',
      });
      return;
    }

    далее();
  }, задержка);
};

