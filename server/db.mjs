import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getContacts = () => db.any("SELECT * FROM contacts");

export const addContact = ({ name, email, phone, notes, image_url }) =>
  db.one(
    "INSERT INTO contacts(name, email, phone, notes, photo) VALUES(*thing1, *thing2, *thing3, *thing4, *thing5, *thing6) RETURNING *",
    [name, email, phone, notes, image_url],
  );

export const updateContact = ({ name, email, phone, notes, image_url }, contact_id) =>
  db.one(
    "UPDATE contacts set name=*thing1, email=*thing2, phone=*thing3, notes=*thing4, photo=*thing5 WHERE id=*thing6 RETURNING *",
    [name, email, phone, notes, image_url, contact_id],
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
