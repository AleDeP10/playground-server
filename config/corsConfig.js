const whitelist = [
  'http://localhost:3000',
  'https://playground.onrender.com',
  'https://playground.io' 
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Dominio non consentito'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Aggiungi Authorization agli allowedHeaders
};

export const socketCorsOptions = {
  cors: {
    origin: process.env.DB_HOSTNAME === "localhost" ? "http://localhost:3000" : "https://playground.net",
    credentials: true,
    allowedHeaders: ["Authorization"],
    methods: ['GET', 'POST']
  }
};

//export default { corsOptions, socketCorsOptions };


