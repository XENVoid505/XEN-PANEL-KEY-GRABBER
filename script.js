// Function to generate a unique device ID
function getDeviceId() {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

// Function to generate a key
function generateKey() {
  const deviceId = getDeviceId();
  const lastGeneratedTime = localStorage.getItem(`lastGeneratedTime_${deviceId}`);
  const currentTime = new Date().getTime();
  const cooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  if (lastGeneratedTime && (currentTime - lastGeneratedTime < cooldown)) {
    const remainingTime = Math.ceil((cooldown - (currentTime - lastGeneratedTime)) / (1000 * 60 * 60));
    document.getElementById('result').innerHTML = `⏳ You can generate another key in ${remainingTime} hours.`;
    return;
  }

  // Generate a new key
  const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem(`lastGeneratedTime_${deviceId}`, currentTime);

  // Display the key and a "Copy Key" button
  document.getElementById('result').innerHTML = `
    🔑 Your new key: <span id="keyText">${key}</span>
    <button onclick="copyKey('${key}')">Copy Key</button>
  `;
}

// Function to copy the key to the clipboard
function copyKey(key) {
  navigator.clipboard.writeText(key)
    .then(() => {
      const resultDiv = document.getElementById('result');
      const originalContent = resultDiv.innerHTML; // Save the original content

      // Show the confirmation message
      resultDiv.innerHTML = `✅ Key copied to clipboard!`;

      // Restore the original content after 3 seconds
      setTimeout(() => {
        resultDiv.innerHTML = originalContent;
      }, 3000); // 3 seconds
    })
    .catch((err) => {
      console.error('Failed to copy key: ', err);
      alert('Failed to copy key. Please copy it manually.');
    });
}