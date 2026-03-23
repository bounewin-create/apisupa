import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// Client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Route GET : lire les utilisateurs
app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Route POST : ajouter un utilisateur
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Route PUT : mettre à jour un utilisateur par id
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({ name, email })
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Utilisateur mis à jour", data });
});

// Route DELETE : supprimer un utilisateur par id
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Utilisateur supprimé", data });
});

// Export pour Vercel
export default app;
