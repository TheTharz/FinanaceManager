const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

const CONSUL_HOST = process.env.CONSUL_HOST || 'http://consul'; // Consul's address
const SERVICE_NAME = 'user-service';
const SERVICE_ID = `${SERVICE_NAME}-${PORT}`;

const healthCheckURL = `http://user-service/health`;

// Register service in Consul
const registerServiceInConsul = async () => {
  const serviceRegistration = {
    ID: SERVICE_ID,
    Name: SERVICE_NAME,
    Tags: ['nodejs', 'express'],
    Address: 'user-service', // Address of the service
    Port: PORT, // Port number the service is running on
    Check: {
      http: healthCheckURL,
      interval: '10s', // Interval for health check
      timeout: '5s', // Timeout for health check
      deregisterCriticalServiceAfter: '60s', // Deregister service if health check fails for more than 60 seconds
    },
  };

  try {
    const response = await axios.put(
      `${CONSUL_HOST}/v1/agent/service/register`,
      serviceRegistration
    );
    console.log('Service registered in Consul:', response.data);
  } catch (error) {
    console.error('Error registering service in Consul:', error);
  }
};

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.status(200).json({
    status: 'ok',
    message: 'The server is up and running!',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, (error: any) => {
  if (!error) {
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT
    );
    registerServiceInConsul(); // Register service after the server starts
  } else console.log("Error occurred, server can't start", error);
});
