export default function handler(request, response) {
  const body =
    request.query.type === "portfolio"
      ? ["European", "Eco-friendly", "German"]
      : request.query.type === "certifications"
      ? ["ISO 9001", "Vegan", "Organic"]
      : ["Please choose either 'portfolio' or 'certifications'"];

  response.status(200).json({
    body: JSON.stringify(body),
    query: request.query,
    cookies: request.cookies,
  });
}
