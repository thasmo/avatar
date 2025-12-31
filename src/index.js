export default {
	async fetch(request) {
		const url = new URL(request.url);
		const pathname = url.pathname;

		let gravatarUrl;

		if (pathname === '/') {
			gravatarUrl = 'https://gravatar.com/avatar/6cbb8756decc9d5103269ab81fd66a6402d1658e7b03355d7f69f710fed31057?s=512';
		} else if (pathname === '/favicon.ico') {
			gravatarUrl = 'https://gravatar.com/avatar/6cbb8756decc9d5103269ab81fd66a6402d1658e7b03355d7f69f710fed31057?s=256';
		} else {
			const match = pathname.match(/^\/([^/]+)\/([^/]+)$/);

			if (match) {
				const [_, hash, size] = match;
				gravatarUrl = `https://gravatar.com/avatar/${hash}?s=${size}`;
			}
		}

		if (gravatarUrl) {
			const newRequest = new Request(gravatarUrl, {
				method: request.method,
				headers: request.headers,
			});

			const response = await fetch(newRequest);

			return new Response(response.body, response);
		}

		return new Response('Not Found', {
			status: 404,
		});
	},
};
