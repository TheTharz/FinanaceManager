import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const CONSUL_HOST = process.env.CONSUL_HOST || 'http://consul:8500';
const SERVICE_NAME = process.env.SERVICE_NAME || 'user-service';
const SERVICE_ID = `${SERVICE_NAME}-${PORT}`;
const SERVICE_ADDRESS = process.env.SERVICE_ADDRESS || 'user-service';

const healthCheckURL = `http://${SERVICE_ADDRESS}:${PORT}/health`;

const serviceRegistration = {
  ID: SERVICE_ID,
  Name: SERVICE_NAME,
  Tags: ['nodejs', 'express'],
  Address: SERVICE_ADDRESS,
  Port: PORT,
  Check: {
    http: healthCheckURL,
    interval: '10s',
    timeout: '5s',
    deregisterCriticalServiceAfter: '60s',
  },
};

// Register service in Consul
export const registerServiceInConsul = async () => {
  try {
    await axios.put(
      `${CONSUL_HOST}/v1/agent/service/register`,
      serviceRegistration
    );
    console.log('Service registered in Consul:', SERVICE_ID);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error registering service in Consul:', error.message);
    } else {
      console.error('Unknown error registering service in Consul:', error);
    }
  }
};

// Deregister service from Consul
export const deregisterServiceFromConsul = async () => {
  try {
    await axios.put(`${CONSUL_HOST}/v1/agent/service/deregister/${SERVICE_ID}`);
    console.log('Service deregistered from Consul:', SERVICE_ID);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error deregistering service from Consul:', error.message);
    } else {
      console.error('Unknown error deregistering service from Consul:', error);
    }
  }
};
