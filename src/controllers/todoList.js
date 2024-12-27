const crea = async (req, res) => {
  const { task, status = "TODO" } = req.body;
  try {
    const [id] = await req.db("Task").insert({ task, status }).returning("id");
    res.status(201).json(id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nella creazione del task" });
  }
};
/*
const setCriteriQuery = (query, criteri) => {
  // Aggiungi la ricerca taskLike se definita
  console.log("todoList.controller", { criteri });
  if (criteri.taskLike) {
    query = query.andWhere("ts.task", "ilike", `%${criteri.taskLike}%`);
  }

  // Raggruppa i criteri di status con un'operazione OR
  query = query.andWhere(function () {
    this.where("ts.status", "!=", "DONE"); // Default to exclude 'DONE' tasks

    // Aggiungi condizioni di status in base ai criteri
    if (criteri.showTodo) {
      this.orWhere("ts.status", "TODO");
    }
    if (criteri.showInProgress) {
      this.orWhere("ts.status", "IN PROGRESS");
    }
    if (criteri.showDone) {
      this.orWhere("ts.status", "DONE");
    }
  });

  return query;
};
*/
const ricerca = async (req, res) => {
  const criteri = req.body;
  try {
    let query = req
      .db("Task AS ts")
      .select("ts.id", "ts.task", "ts.status")
      .from("Task AS ts");

    //query = setCriteriQuery(query, criteri).orderBy("ts.id", "asc");
    query = query.orderBy("ts.id", "asc");

    const risultati = await query;
    console.log({ criteri, risultati });
    res.status(200).json(risultati);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nella ricerca dei dati" });
  }
};

const aggiorna = async (req, res) => {
  const { id } = req.query;
  const { task, status } = req.body;
  try {
    const count = await req.db("Task").where({ id }).update({ task, status });
    if (count) {
      res.status(200).json({ message: "Task aggiornato con successo" });
    } else {
      res.status(404).json({ error: "Task non trovato" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nell'aggiornamento del task" });
  }
};

const cancella = async (req, res) => {
  console.log("req.db type:", typeof req.db); // Verifica che sia 'function'
  const { id } = req.query;
  try {
    const count = await req.db("Task").where({ id }).del();
    if (count) {
      res.status(200).json({ message: "Task eliminato con successo" });
    } else {
      res.status(404).json({ error: "Task non trovato" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nell'eliminazione del task" });
  }
};

export { crea, ricerca, aggiorna, cancella };