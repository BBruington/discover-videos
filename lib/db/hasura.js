export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userid: {_eq: $userId}, videoid: {_eq: $videoId}}) {
      id
      favorited
      userid
      videoid
      watched
    }
  }
`;

const response = await queryHasuraGQL(operationsDoc, "findVideoIdByUserId", { 
  videoId,
  userId,
}, token);
return response;
}

export async function createNewUser(token, metadata) {
  /* $ means variable, String! means it's required and a string */
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;

  const response = await queryHasuraGQL(operationsDoc, "createNewUser", { 
    issuer,
    email,
    publicAddress,
  }, token);
  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
  `;

  const response = 
  await queryHasuraGQL(operationsDoc, "isNewUser", { 
    issuer
  }, token);
  return response?.data?.users?.length === 0;
}

export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}
