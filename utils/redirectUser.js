import { verifyToken } from "../lib/utils";

const UseRedirectUser = async (context) => {
  const userId = await verifyToken(token);
  const token = context.req ? context.req.cookies.token : null;

  return {
    userId, 
    token,
  }
};

export default UseRedirectUser;