import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, request }) => {	
    try {
      let url_param = url.searchParams.entries().next().value[0]
      console.log(url_param)
      let image_url = new URL(url_param);

      request = new Request(url, request)
      request.headers.set('Origin', new URL(image_url).origin)

      let respose = await fetch(request)

      // Reinitialise so we can
      respose = new Response(respose.body, respose)

      // Set CORS headers
      respose.headers.set('Access-Control-Allow-Origin', '*',)
      respose.headers.set("Access-Control-Allow-Credentials", "*",)
      respose.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, OPTIONS',)
      respose.headers.set('Access-Control-Allow-Headers', '*',)
      
      // Append to/Add Vary header so browser will cache response correctly
      respose.headers.append('Vary', 'Origin')
      return respose
    } catch {
        return new Response(null, { status: 400 });
	}
}

