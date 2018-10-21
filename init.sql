DROP DATABASE IF EXISTS fantastic_runs;
CREATE DATABASE fantastic_runs;

\c fantastic_runs;

CREATE TABLE routes(
  routes_id SERIAL PRIMARY KEY,
  name VARCHAR
);

INSERT INTO routes (routes_id, name)
  VALUES(default, 'fun run!');