self.addEventListener('activate', async () => 
{
    try 
    {
      const publicKey='BKhSHyPZOZiEhBfIvnLRosMKpWeprqHWXK5r7Pv650HYlOkpbn16-ri4tJubVNDvO7zhWSytqQhsh3ngsuv348M';
      const applicationServerKey = encodeBase64ToArrrayBuffer(publicKey);
      const options = { applicationServerKey, userVisibleOnly: true }
      const subscription = await self.registration.pushManager.subscribe(options);
      console.log(JSON.stringify(subscription))
      const response = await saveSubscription(subscription);
      console.log(response)
    } catch (err) {
      console.log('Error', err)
    }
});

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Notification: ', event.data.text())

    event.waitUntil(
      self.registration.showNotification(event.data.text(), {
        body: 'Notification from the server',
        tag: 'vibration-sample'
      })
    );
  } else {
    console.log('Push event but no data')
  } 
})

function encodeBase64ToArrrayBuffer(base64String) 
{
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) 
    {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

async function saveSubscription(subscription)
{
  //const SERVER_URL = 'http://localhost:4000/save-subscription'
  const SERVER_URL = 'http://localhost:7071/api/save-subscription';
  console.log("saving to: " + SERVER_URL);
  const response = await fetch(SERVER_URL, 
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })
  return response.json()
}


  