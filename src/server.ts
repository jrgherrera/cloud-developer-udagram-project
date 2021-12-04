import express from 'express';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';

require('dotenv').config();

import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  const generateJWT = (username: any) => {
    return jwt.sign(username, process.env.JWT_SECRET);
  }

  const requireAuth = (req: any, res: any, next: any) => {
    let { token } = req.query;
    if (!req.headers.authorization && !token) {
      return res.status(401).send({ message: 'Missing authorization token' });
    }

    token = token || req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({
          message: 'Unauthorized'
        });
      } else {
        next();
      }
    });
  }
  
  app.get("/login", async (req, res) => {
    const { username, password } = req.query;

    if (!username || !password) {
      return res.status(422).send("Missing parameters");
    }

    if (username !== "admin" && password !== "admin") {
      return res.status(401).send("Unauthorized");
    }

    const token = generateJWT(username);

    return res.status(200).send({ username, token });
  })

  app.get( "/filteredimage", requireAuth, async ( req, res ) => {
    const { image_url } = req.query;

    if (!image_url) {
      return res.status(422).send('Image url is required');
    }

    const filteredPath = await filterImageFromURL(image_url);

    return res.sendFile(filteredPath, err => {
      if (err) {
        return res.status(500).send('Unable to process image');
      }
      deleteLocalFiles([filteredPath]);
    });
  } );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();