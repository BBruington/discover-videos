import jwt from 'jsonwebtoken';
import { findVideoIdByUser } from '../../lib/db/hasura';

export default async function ststs( req, res ) {
  if (req.method === "POST") {

    try{

      const token = req.cookies.token;

      if (!token) {
        res.status(403).send({});
      }else{

        const videoId = req.query.videoId;

        const decodedToken = jwt.verify(token, process.env.HASURA_GRAPHQL_JWT_SECRET);

        const userId = decodedToken.issuer;

        const findVideoId = await findVideoIdByUser(token, userId, videoId);

        res.send({ msg: 'api working ', decodedToken, findVideoId });  
      }
    } catch (error) {
      console.error('error', error);
      res.status(500).send({ done: false, error: error?.message })
    }
  }
}