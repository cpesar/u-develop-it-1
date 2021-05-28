-- this will drop/delete the tables every time you run the schema.sql file, ensuring you start with a clean slate
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;





-- create a parties table
    -- parties table MUST be defined before the candidates table b/c the constraint relies on the parties table
CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  -- use text instead of VARCHAR because the description is not limited to a set number of characters
  description TEXT
);




-- create a candidates table
CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  -- added a constraint, allows us to flag the party_id field as a foreign key and tells sql which table and field it references
  -- this references the id field in the parties table
  -- ensures that no id can be inserted into the candidates table if it doesnt also exist in the parties table
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);


