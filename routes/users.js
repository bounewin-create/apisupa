import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// Client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// GET : lire tous les utilisateurs
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST : ajouter un utilisateur
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from("users").insert([{ name, email }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// PUT : mettre à jour un utilisateur par id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const { data, error } = await supabase.from("users").update({ name, email }).eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Utilisateur mis à jour", data });
});

// DELETE : supprimer un utilisateur par id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Utilisateur supprimé", data });
});

export default router;
