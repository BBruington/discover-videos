
export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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

  const operationsDoc = `
  query MyQuery {
    users (where: {issuer: {_eq:
    "did:e:0c310f4E954178Fc344A3cd2604fD95Df4b9d50dA5"}})
    {
      id
      email
      issuer
    }
  }
`;

function fetchMyQuery() {
                      //operationsDoc, operationName, variables, token
  return queryHasuraGQL(operationsDoc, "MyQuery", {}, '');
}

export async function startFetchMyQuery() {
  const {errors, data } = await fetchMyQuery();
  if (errors) {
    console.error(errors);
  }
  console.error(data);
}

