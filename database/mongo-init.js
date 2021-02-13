db.auth('root', 'changeme');
db = db.getSiblingDB('jscollector');
db.createUser(
  {
    user: 'myuser',
    pwd: 'changeme',
    roles: [
      {
        role: 'readWrite',
        db: 'jscollector'
      }
    ]
  }
);
