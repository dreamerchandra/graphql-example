async function fetchGraphQL(text, variables) {

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: text,
        variables,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // Get the response as JSON
    return await response.json();
  }
  export default fetchGraphQL;