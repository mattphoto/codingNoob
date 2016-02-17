var express = require('express');

var routes = function (Resource) {

  var resourceRouter = express.Router();

  resourceRouter.route('/')

    .post(function (req, res) {
      var resource = new Resource(req.body);
      console.log(resource);
      resource.created_at = new Date();

      console.log(req.body);
      resource.save();
      res.status(201).send(resource);
    })
    .get(function (req, res) {
      var query = {};
      if (req.query.category ) {
        query.category = req.query.category;
      }
      Resource.find(query, function (err, resource) {
        if (err)
          res.status(500).send(err);
        else
          res.json(resource);
      });
    });


  resourceRouter.use('/:resourceId', function (req, res, next) {
      Resource.findById(req.params.resourceId, function (err, resource) {
        if (err)
          res.status(500).send(err);
        else if (resource) {
          req.resource = resource;
          next();
        } else {
          res.status(404).send('no resource found');
        }
    });
  });

  resourceRouter.route('/:resourceId')
    .get(function (req, res) {
      res.json(req.resource);
    })
    .put(function (req, res) {
      req.resource.rating = req.body.rating;
      req.resource.cost = req.body.cost;

      req.resource.category = req.body.category;
      req.resource.title = req.body.title;
      req.resource.author = req.body.author;
      req.resource.url = req.body.url;
      req.resource.description = req.body.description;

      req.resource.difficulty = req.body.difficulty;
      req.resource.type = req.body.type;
      req.resource.length = req.body.length;
      req.resource.date = req.body.date;
      req.resource.date_published = req.body.date_published;
      req.resource.updated_at = new Date();

      console.log(req.resource);

      req.resource.save(function (err) {
        if(err){
          res.status(500).send(err);
        } else {
          res.json(req.resource);
        }
      })
    })
    .patch(function (req, res) {
      if(req.body._id){
        delete req.body._id;
      }
      for (p in req.body) {
        req.resource[p] = req.body[p];
      }
      req.resource.save(function (err) {
        if(err){
          res.status(500).send(err);
        } else {
          res.json(req.resource);
        }
      })
    })
    .delete(function (req, res) {
      req.resource.remove(function (err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    })
    ;

  return resourceRouter;
};

module.exports = routes;
