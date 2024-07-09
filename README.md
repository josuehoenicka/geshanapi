### Step to Step

1. Execute this:
   <br/>
   <code>npx express-generator --no-view --git nodejs-mysql</code>
   <br/>
   <code>cd nodejs-mysql</code>
   <br/>
   <code>npm install</code>
   <br/>
   <code>npm start</code>

2. Go to <code><i>localhost:3000</i></code>

3. Delete public folder

4. Delete "routes/users.js"

5. Add "routes/quotes.js"
   <br/>
   <code>
   const express = require('express');
   const cookieParser = require('cookie-parser');
   const logger = require('morgan');

    const indexRouter = require('./routes/index');
    const quotesRouter = require('./routes/quotes');

    const app = express();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/', indexRouter);
    app.use('/quotes', quotesRouter);

    module.exports = app;
    </code>
   <br/>

6. Change all "var" to "const" on "app.js"

7. Configure MySQL

   <br/>
   <code>
   /* Create DB and table */
   CREATE DATABASE geshanapi;
   USE geshanapi;
   CREATE TABLE `quote`
   (
      `id` INT(11) NOT NULL AUTO_INCREMENT,
      `quote` VARCHAR(255) NOT NULL,
      `author` VARCHAR(255) NOT NULL,
      `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`),
      INDEX `idx_author` (`author`),
      UNIQUE `idx_quote_unique` (`quote`)
   )
   ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

   /* Insert into the table */
   INSERT INTO `quote` (`id`, `quote`, `author`) VALUES
   (1, 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 'Bjarne Stroustrup'),
   (3, 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'),
   (4, 'First, solve the problem. Then, write the code.', 'John Johnson'),
   (5, 'Java is to JavaScript what car is to Carpet.', 'Chris Heilmann'),
   (6, 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'John Woods'),
   (7, "I'm not a great programmer; I'm just a good programmer with great habits.", 'Kent Beck'),
   (8, 'Truth can only be found in one place: the code.', 'Robert C. Martin'),
   (9, "If you have to spend effort looking at a fragment of code and figuring out what it's doing, then you should extract it into a function and name the function after the 'what'.", 'Martin Fowler'),
   (10, 'The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.', 'Donald Knuth'),
   (11, 'SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.', 'Philip Greenspun'),
   (12, 'Deleted code is debugged code.', 'Jeff Sickel'),
   (13, 'There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.', 'C.A.R. Hoare'),
   (14, 'Simplicity is prerequisite for reliability.', 'Edsger W. Dijkstra'),
   (15, 'There are only two hard things in Computer Science: cache invalidation and naming things.', 'Phil Karlton'),
   (16, 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', 'Bill Gates');

   /* See table */
   USE geshanapi;
   SHOW TABLES;
   DESCRIBE quote;
   SELECT * FROM quote;
   </code>
   <br/>

8. Wire up Node.js with MySQL
   <br/>
   <code>npm install --save mysql2</code>
   <br/>

9. Create "config.js" on root:
   <br/>
   <code>
   const env = process.env;

   const config = {
   db: { /* do not put password or any sensitive info here, done only for demo */
      host: env.DB_HOST || 'remotemysql.com',
      user: env.DB_USER || '2ZE90yGC6G',
      password: env.DB_PASSWORD || 'JZFqXibSmX',
      database: env.DB_NAME || '2ZE90yGC6G',
      waitForConnections: true,
      connectionLimit: env.DB_CONN_LIMIT || 2,
      queueLimit: 0,
      debug: env.DB_DEBUG || false
   },
   listPerPage: env.LIST_PER_PAGE || 10,
   };
   
   module.exports = config;
   </code>
   <br/>

10. Create "services/db.js"
   <br/>
   <code>
   const mysql = require('mysql2/promise');
   const config = require('../config');
   const pool = mysql.createPool(config.db);

   async function query(sql, params) {
   const [rows, fields] = await pool.execute(sql, params);

   return rows;
   }

   module.exports = {
   query
   }
   </code>
   <br/>


11. Create "services/quotes.js"
   <br/>
   <code>
   const db = require('../services/db');

   async function getMultiple(){
   const data = await db.query('SELECT id, quote, author FROM quote');
   const meta = {page: 1};

   return {
      data,
      meta
   }
   }

   module.exports = {
   getMultiple
   }
   </code>
   <br/>

12. Update "config.js" with your public data or env data
   <br/>
   <code>npm install dotenv</code>
   <br/>

   ### .env
   <code>
   DB_HOST=37.59.55.185
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=geshanapi
   DB_CONN_LIMIT=10
   DB_DEBUG=false
   LIST_PER_PAGE=10
   </code>
   <br/>

   ### config.js
   <code>
   require('dotenv').config();

   const env = process.env;

   const config = {
   db: {
      host: env.DB_HOST || "remotemysql.com",
      user: env.DB_USER || "2ZE90yGC6G",
      password: env.DB_PASSWORD || "JZFqXibSmX",
      database: env.DB_NAME || "2ZE90yGC6G",
      waitForConnections: true,
      connectionLimit: env.DB_CONN_LIMIT || 2,
      queueLimit: 0,
      debug: env.DB_DEBUG || false,
   },
   listPerPage: env.LIST_PER_PAGE || 10,
   };

   module.exports = config;
   </code>
   <br/>