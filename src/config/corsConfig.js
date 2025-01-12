const whitelist = [
  "http://localhost",
  "http://localhost:3000",
  "https://playground.onrender.com",
  "https://playground.io"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Dominio non consentito"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
};

export { corsOptions };
