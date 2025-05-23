# Rest APIs

## Rest APIs

Wir erstellen eine Rest API mit express und einer Datenbank, die mittels der _mysql2_ Library verbunden ist.

Die Datenbank enthält eine einzelne Tabelle namens "task"

## Rest APIs

Bemerkung: Verschiedene Rest APIs können sich bei _Mutationen_ oft unterschiedlich verhalten

Beispiel: Mögliche Antworten, wenn ein Eintrag mittels _POST_ erstellt wurde:

- der vollständige neue Eintrag wird im Response Body zurückgeschickt (inklusive neu zugewiesener id)
- nur die neue id wird im Body zurückgeschickt
- kein Response Body wird zurückgeschickt

## Rest APIs

grundlegendes Setup:

```js
app.use('/api', express.json());
app.use('/api', cors());
```

## Rest APIs

Alle Einträge einer Ressource abfragen:

```js
app.get('/api/tasks', async (req, res) => {
  const [results] = await db.query('SELECT * FROM task;');
  res.json(results);
});
```

## Rest APIs

nach einer bestimmten id abfragen:

```js
app.get('/api/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const sqlStatement = 'SELECT * FROM task WHERE id = ?';
  const [results] = await db.query(sqlStatement, [id]);
  if (results.length === 0) {
    // 404 Not Found
    res.status(404).send();
  } else {
    res.json(results[0]);
  }
});
```

## Rest APIs

nach bestimmten Parametern abfragen (_is_done_, _due_date_):

```js
app.get('/api/tasks/', async (req, res) => {
  // array of conditions - e.g. ['is_done = ?', 'due_date = ?']
  const conditions = [];
  // array of corresponding values - e.g. [1, '2020-10-30']
  const values = [];

  if (req.query.due_date !== undefined) {
    conditions.push('due_date = ?');
    values.push(req.query.due_date);
  }

  if (req.query.is_done !== undefined) {
    conditions.push('is_done = ?');
    // can be either "0" or "1"
    values.push(Number(req.query.is_done));
  }

  let sqlStatement = 'SELECT * FROM task';
  if (conditions.length > 0) {
    sqlStatement += ` WHERE ${conditions.join(' AND ')}`;
  }

  // sqlStatement = complete SQL statement with variables, e.g.:
  // SELECT * FROM task WHERE is_done = ? AND due_date = ?
  // values = corresponding values, e.g.:
  // [1, '2020-10-30']

  const [results] = await db.query(sqlStatement, values);
  res.json(results);
});
```

## Rest APIs

Einen neuen Eintrag erstellen:

```js
app.post('/api/tasks', async (req, res) => {
  const isDone = req.body.is_done;
  const dueDate = req.body.due_date;
  if (isDone === undefined || dueDate === undefined) {
    // 400 Bad Request
    res.status(400).send();
    return;
  }
  const sqlStatement = `INSERT INTO task (due_date, is_done) VALUES (?, ?)`;
  const values = [dueDate, isDone];

  const [results] = await db.query(sqlStatement, values);

  // 201 Created (or 200 OK)
  res.status(201).json({ id: results.insertId });
});
```

## Rest API

einen Eintrag ersetzen - via put:

```js
app.put('/api/tasks/:id', async (req, res) => {
  const isDone = req.body.is_done;
  const dueDate = req.body.due_date;

  if (isDone === undefined || dueDate === undefined) {
    // 400 Bad Request
    res.status(400).send();
    return;
  }
  const id = Number(req.params.id);
  const sqlStatement = `
    UPDATE task
    SET due_date = ?, is_done = ?
    WHERE id = ?
  `;
  const values = [dueDate, isDone, id];
  const [results] = await db.query(sqlStatement, values);
  if (results.affectedRows === 0) {
    // 404 Not Found
    res.status(404).send();
  } else {
    res.send();
  }
});
```

## Rest API

Löschen eines Eintrags:

```js
app.delete('/api/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const sqlStatement = `DELETE FROM task WHERE id = ?`;
  const values = [id];
  const [results] = await db.query(sqlStatement, values);

  if (results.affectedRows === 0) {
    // 404 Not Found
    res.status(404).send();
  } else {
    res.send();
  }
});
```
