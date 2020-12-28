const openbrowser = require('open');
const express = require('express') 
const cors = require('cors') 
const bodyParser = require('body-parser')

const app = express() 
app.use(cors()) 
app.use(bodyParser.json()) 
const port = 4000 
app.get('/', (req, res) => res.send('Hello World!')) 

const memoryDb = { subscription: null } 
async function saveToDatabase(subscription) 
{
  memoryDb.subscription = subscription
}

app.post('/save-subscription', async (req, res) => 
{
  console.log("Added Subscriber!");
  const subscription = req.body;
  console.log(subscription);
  await saveToDatabase(subscription);
  res.json({ message: 'success' });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
  openbrowser(`http://localhost:${port}`)
})

const webpush = require('web-push')
const vapidKeys = 
{
  publicKey: 'BKhSHyPZOZiEhBfIvnLRosMKpWeprqHWXK5r7Pv650HYlOkpbn16-ri4tJubVNDvO7zhWSytqQhsh3ngsuv348M',
  privateKey: 'WCtNHUsiQ2pGSRRl06mgV1L0NKduw55E3WhTXb0hiRw',
}
webpush.setVapidDetails('mailto:rickard@nisses-gagner.se',vapidKeys.publicKey, vapidKeys.privateKey);

function sendNotification(subscription, dataToSend='')
{
  webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => 
{
  const subscription = memoryDb.subscription 
  const message = 'Hello World'
  sendNotification(subscription, message)
  res.json({ message: 'message sent' })
})

