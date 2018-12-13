const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const Waterline = require('waterline');
const mysql = require('sails-mysql');
const orm = new Waterline();

const contactsCollection = Waterline.Collection.extend({
    identity: 'contacts',
    datastore: 'default',
    primaryKey: 'id',
    attributes: {
        id: {
            type: 'number',
            autoMigrations: {autoincrement: true}
        },
        username: {type: 'string'},
        fullname: {type: 'string'},
        avatar: {type: 'string'},
        phone: {type: 'string'}
    }
});

orm.registerModel(contactsCollection);

const ormConfig = {
    adapters: { mysql },
    datastores: {
        adapter: 'mysql',
        url: 'mysql://denial:masterpassword@denial-aurora-contacts-db.cluster-ck7a5aw5p7fy.us-east-1.rds.amazonaws.com:3306/contacts'
    }
}

const bucket = process.env.BUCKET;

exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body);
    let image = Buffer.from(body.avatar, 'base64');
    const filePath = `avatars/${body.username}.png`;

    const params = {
        Bucket: bucket,
        Key: filePath
    };

    S3.putObject({...params, Body: image, ContentType: 'image/png'}).promise()
    .then(() => {
        orm.initialize(ormConfig, (err, ontology) => {
            const Contact = ontology.collections.contacts;

            (async () => {
                return await Contact.create({
                    username: body.usernmae,
                    fullname: body.fullname,
                    phone: body.phone,
                    avatar: `https://s3.amazonaws.com/denial-image-storage/avatars/${body.username}.png`
                });
            })()
            .then(contact => callback(null, {
                statusCode: 200,
                headers: {},
                body: JSON.stringify(contact),
                isBase64Encoded: false
            }))
            .catch(err => callback(err, null));
        });
    })
    .catch(err => callback(err, null));
};
