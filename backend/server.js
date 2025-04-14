const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ZENDESK_SUBDOMAIN = 'yourcompany'; // update
const ZENDESK_EMAIL = 'your_email@example.com';
const ZENDESK_API_TOKEN = 'your_api_token';

app.post('/create-ticket', async (req, res) => {
  const { name, email, subject, description } = req.body;

  try {
    const response = await axios.post(
      `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json`,
      {
        ticket: {
          requester: { name, email },
          subject,
          comment: { body: description }
        }
      },
      {
        auth: {
          username: `${ZENDESK_EMAIL}/token`,
          password: ZENDESK_API_TOKEN
        }
      }
    );

    res.status(200).json({ message: 'Ticket created', ticketId: response.data.ticket.id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
