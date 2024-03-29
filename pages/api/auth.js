import { Level } from 'level';

const db = new Level('./mydb', { valueEncoding: 'json' });

const users = [
  { username: 'muser1', password: 'mpassword1', blocked: false },
  { username: 'muser2', password: 'mpassword2', blocked: false },
  { username: 'muser3', password: 'mpassword3', blocked: true },
];
  
users.forEach(async (user) => {
  await db.put(user.username, user);
});

export default async function Auth(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const user = await db.get(username);
      if (user.password === password) {
        if (user.blocked) {
          res.status(401).json({ message: 'Ce compte a été bloqué.' });
        } else {
          res.status(200).json({ message: 'Authentification réussie.' });
        }
      } else {
        res.status(401).json({ message: 'Informations de connexion invalides.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Informations de connexion invalides.' });
    }
  } else {
    res.status(405).end();
  }
}

