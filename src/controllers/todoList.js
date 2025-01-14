const create = async (req, res) => {
  const { task, status = "TODO" } = req.body;
  try {
    const [id] = await req.db("Task").insert({ task, status }).returning("id");
    res.status(201).json(id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in task creation" });
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
const search = async (req, res) => {
  const criteri = req.body;
  try {
    let query = req
      .db("Task AS ts")
      .select("ts.id", "ts.task", "ts.status")
      .from("Task AS ts");

    //query = setCriteriQuery(query, criteri).orderBy("ts.id", "asc");
    query = query.orderBy("ts.id", "asc");

    const results = await query;
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in task search" });
  }
};

const update = async (req, res) => {
  const { id } = req.query;
  const { task, status } = req.body;
  try {
    const count = await req.db("Task").where({ id }).update({ task, status });
    if (count) {
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in updating the task" });
  }
};

const remove = async (req, res) => {
  console.log("req.db type:", typeof req.db); // Verifica che sia 'function'
  const { id } = req.query;
  try {
    const count = await req.db("Task").where({ id }).del();
    if (count) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in deleting the task" });
  }
};

export { create, search, update, remove };