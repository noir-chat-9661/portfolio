/// <reference types="@cloudflare/workers-types" />

interface ContactBody {
	name: string;
	email: string;
	message: string;
}

export const onRequestPost: PagesFunction<{
	CONTACT_SERVICE?: Fetcher;
}> = async (context) => {
	try {
		const { name, email, message } = await context.request.json<ContactBody>();

		// すべての項目を必須チェック (トリムして空文字でないか検証)
		if (!name?.trim() || !email?.trim() || !message?.trim()) {
			return new Response(
				JSON.stringify({ error: "All fields are required and cannot be empty." }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		console.log(`[Contact API] Received from: ${name.trim()} <${email.trim()}>`);
		console.log(`[Contact API] Message: ${message.trim()}`);

		const contactService = context.env.CONTACT_SERVICE;

		if (contactService) {
			// Service Binding (CONTACT_SERVICE) 経由で別のサービスへリクエストを転送 (/notify/form へ転送)
			const serviceUrl = new URL("/notify/form", context.request.url);
			const serviceResponse = await contactService.fetch(
				new Request(serviceUrl.toString(), {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: name.trim(),
						email: email.trim(),
						message: message.trim(),
					}),
				})
			);

			if (!serviceResponse.ok) {
				console.error("[Contact API] Failed to call CONTACT_SERVICE service binding");
				return new Response(
					JSON.stringify({ error: "Failed to process contact request via service binding." }),
					{
						status: 500,
						headers: { "Content-Type": "application/json" },
					}
				);
			}
		} else {
			console.log("[Contact API] (Local Dev) CONTACT_SERVICE is not bound. Mocking success.");
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("[Contact API] Error: ", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
