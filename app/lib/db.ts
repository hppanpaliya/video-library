import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

let db: Database.Database | null = null;

export function getDB() {
  if (!db) {
    db = new Database('./database.sqlite', {
      fileMustExist: false,
    });
    
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
  }
  return db;
}

export function createUser(username: string, password: string) {
  const db = getDB();
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  try {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    stmt.run(username, hashedPassword);
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
}

export function verifyUser(username: string, password: string) {
  const db = getDB();
  
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = stmt.get(username) as { id: number; username: string; password: string } | undefined;
    
    if (!user) return null;
    
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return null;
    
    return { id: user.id, username: user.username };
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
}

process.on('exit', () => {
  if (db) {
    console.log('Closing database connection...');
    db.close();
  }
});

process.on('SIGINT', () => {
  process.exit();
});