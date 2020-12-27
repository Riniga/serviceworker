self.addEventListener('activate', async () => 
{
    try 
    {
      const publicKey='BEeyN3NngzEKkT9RjdiO361ffv6tZpC0xkPFzgI5riNn944Gi-jzhQZa7hRnIgxFgOehhSBaAtyvwMaQDCZq3gs';
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
    console.log('Push event!! ', event.data.text())
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

function saveSubscription(subscription)
{
  const SERVER_URL = 'http://localhost:4000/save-subscription'
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


  