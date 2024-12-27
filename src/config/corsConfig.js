const whitelist = [
  'http://localhost:3000',
  'https://playground.onrender.com',
  'https://playground.io'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Dominio non consentito'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Aggiungi Authorization agli allowedHeaders
};

const socketCorsOptions = {
  cors: {
    origin: process.env.DB_HOSTNAME === 'localhost' ? 'http://localhost:'+process.env.PORT : 'https://playground.io',
    credentials: true,
    allowedHeaders: ['Authorization'],
    methods: ['GET', 'POST']
  }
};

export { corsOptions, socketCorsOptions }