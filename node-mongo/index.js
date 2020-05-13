const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    
    dboper.insertDocument(db,{name: "Vadonut", description: "Test"},'dishes',(result)=>{
        console.log("Insert Document:\n", result.ops);

        //inside insert callback func
        dboper.findDocument(db,'dishes',(docs)=>{
            console.log('Found doc:\n',docs);


            //inside find callback func
            dboper.updateDocument(db,{name:'Vadonut'},{description: "UPDATED"},'dishes',(result)=>{
                console.log("Updated Document:\n", result.result);

                //inside update callback func
                dboper.findDocument(db,'dishes',(docs)=>{
                    console.log("Found Updated Documents:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                        client.close();
                    });
                });
            });
        });
    });
});