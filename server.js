import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// Initialisation du client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Route simple pour récupérer les utilisateurs
app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Export pour Vercel
export default app;
