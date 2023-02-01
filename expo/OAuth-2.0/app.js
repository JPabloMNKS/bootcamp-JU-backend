import express from 'express';
import oauthServer from 'express-oauth-server';

const app = express();

app.oauth = new oauthServer({
  model: {
    async getClient (clientId, clientSecret) {
      // Get client details from database or some other source
      return {
        clientId,
        clientSecret,
        grants: ['password']
      };
    },
    async getUser (username, password) {
      // Get user details from database or some other source
      return {
        username,
        password
      };
    },
    async saveToken (token, client, user) {
      // Save the token to database or some other source
      return {
        accessToken: token.accessToken,
        accessTokenExpiresAt: new Date(token.accessTokenExpiresAt),
        client: client,
        user: user
      };
    },    
    async getAccessToken(accessToken) {
      // Get access token details from database or some other source
      return {
        accessToken,
        client: { id: 'clientId' },
        user: { id: 'userId' }
      };
    },  
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/oauth/token', app.oauth.token());

app.get('/secure', app.oauth.authenticate(), (req, res) => {
  res.json({ message: 'Secure data' });
});

app.listen(3000, () => {
  console.log('OAuth API server running on http://localhost:3000');
});
