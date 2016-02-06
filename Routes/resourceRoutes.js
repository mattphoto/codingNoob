var express = require('express');

var routes = function (Resource) {

  var resourceRouter = express.Router();

  resourceRouter.route('/')

    .post(function (req, res) {
      var resource = new Resource(req.body);
      console.log(resource);
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
        console.log(query);
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
      req.resource.title = req.body.title;
      req.resource.url = req.body.url;
      req.resource.category = req.body.category;
      req.resource.description = req.body.description;
      // req.resource.date = req.body.date;
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
