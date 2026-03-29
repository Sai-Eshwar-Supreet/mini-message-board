const {Client} = require('pg');

const connectionString = process.argv[2];

if(!connectionString){
    console.error('Database url not provided');
    process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    username VARCHAR (255),
    message TEXT,
    date TIMESTAMPTZ
);
`;

async function main(){
    console.log("Initializing DB");
    const client = new Client({
        connectionString: connectionString
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();