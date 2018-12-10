const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const bucket = process.env.BUCKET;
const apiUrl = process.env.API_URL;

const service = new AWS.Service({
    endpoint: apiUrl,
    convertResponseTypes: false,
    apiConfig: {
        metadata: {
            protocol: 'rest-json'
        },
        operations: {
            CreateContact: {
                http: {
                    method: 'POST',
                    requestUri: '/contacts',
                },
                input: {
                    type: 'structure',
                    payload: 'data',
                    members: {
                        'data': {
                            type: 'structure',
                            members: {
                                'username': {},
                                'fullname': {},
                                'avatar': {},
                                'phone': {}
                            }
                        }
                    }
                }
            }
        }
    }
});

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
        service.createContact({
            data: {
                username: body.usernmae,
                fullname: body.fullname,
                phone: body.phone,
                avatar: `https://s3.amazonaws.com/denial-image-storage/avatars/${body.username}.png`,
            }
        }, (err, data) => {
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, {
                statusCode: 200,
                headers: {},
                body: JSON.stringify(data),
                isBase64Encoded: false
            });
        });

    })
    .catch(err => callback(err, null));
};
