import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const SECRET_KEY = 'secretcode';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await axios.get("http://localhost:3000/api/user/");
      const users = response.data;

      const user = users.find(username === username && password === password);

      if (user) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}