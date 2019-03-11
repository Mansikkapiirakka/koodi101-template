const database = require('../database');

exports.list = async (ctx) => {
  let options = {};

  let result = await database.Sensor.findAll(options);
  let sensors = await Promise.all(result.map(sensor => sensor.toJSON()));

  let response = {
    results: sensors,
  };

  ctx.body = response;
};

exports.create = async (ctx) => {
  const params = ctx.request.body;

  const sensor = await database.Sensor.create({
    temperature: params.temperature,
    humidity: params.humidity,
  });

  ctx.body = await sensor.toJSON();
  ctx.status = 201;
};
