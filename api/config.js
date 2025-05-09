export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
      window.CONFIG = {
        API_KEY: "${process.env.WEATHER_API_KEY}",
        API_URL: "${process.env.WEATHER_API_URL}"
      };
    `);
}
