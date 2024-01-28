addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
	const { pathname, search } = new URL(request.url);
  
	// List of built-in paths that should not trigger an error
	const allowedPaths = ['/health', '/status'];
  
	// if (allowedPaths.includes(pathname)) {
	//   // Allow requests to built-in paths
	//   return fetch(request);
	// }
  
	// Make a request to someapi.jonasjones.dev/[PATH] including URL parameters
	const apiUrl = `https://someapi.jonasjones.dev${pathname}${search}`;
	const apiRequest = new Request(apiUrl, {
	  method: request.method,
	  headers: request.headers,
	  body: request.body
	});
  
	try {
	  const apiResponse = await fetch(apiRequest);
  
	  if (apiResponse.ok) {
		// If the API request is successful, return the response
		return apiResponse;
	  } else if (apiResponse.status === 502 || apiResponse.status === 530) {
		// If the API request fails, return an error response
		return new Response('Service Unavailable', {
		  status: 503,
		  statusText: 'Service Unavailable'
		});
	  } else {
		// If the API request fails, return an error response
		return new Response('API backend went down just now :( It should be back up in a matter of seconds!', {
		  status: apiResponse.status,
		  statusText: apiResponse.statusText
		});
	  }
	} catch (error) {
	  // If an error occurs during the API request, return an error response
	  return new Response('API backend is down temporarily', {
		status: 420,
		statusText: 'API Backend Downtime Error'
	  });
	}
  }
  