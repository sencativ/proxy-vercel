export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Tambahkan ini
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Parameter "name" diperlukan.' });
  }

  const SERVER_URL = process.env.SERVERTAP_URL;
  const SERVER_KEY = process.env.SERVERTAP_TOKEN; // variable you create below

  try {
    const response = await fetch(`${SERVER_URL}/v1/players/all`, {
      headers: {
        "key": SERVER_KEY
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: 'Gagal mengambil data dari ServerTap nih',
        detail: text
      });
    }

    const players = await response.json();

    const player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!player) {
      return res.status(200).json({
        name,
        exists: false,
        message: "Anda belum pernah login ke server!"
      });
    }

    return res.status(200).json({
      name: player.name,
      uuid: player.uuid,
      op: player.op,
      banned: player.banned,
      balance: player.balance,
      lastPlayed: player.lastPlayed,
      exists: true
    });

  } catch (err) {
    return res.status(500).json({
      error: "Gagal menghubungi ServerTap",
      detail: err.message
    });
  }
}
