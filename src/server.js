import Hapi from 'hapi';
import Joi from 'joi';

const server = new Hapi.Server();

server.connection({
  port: 3000,
})

server.route({
  method: 'POST',
  path: '/cache',
  config: {
    handler: (req, res) => {
      const array = req.payload.param;
      array.sort((a, b) => {
        return b - a;
      })
      setTimeout(() => {
        res(array).code(200)
      }, 2000);
    },
    validate: {
        payload: {
          param: Joi.array().items(Joi.number()),
        },
    },
  },
})

server.route({
  method: 'POST',
  path: '/test',

    handler: (req, res) => {
        setTimeout(() => {
          res({
            "ok": 1
          }).code(200)
        }, 2000);
    },
    config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.number().required(),
      }
    }
  }

});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (req, res) => {
    if (req.query.param) {
      res({ "hello": req.query.param });
    } else {
      res('missing param').code(400)
    }
  },
});



server.start((err) => {
  if (err) {
    console.error(err);
  }
  console.log('server started');
})
