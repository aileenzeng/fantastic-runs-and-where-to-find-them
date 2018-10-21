'use strict';
module.exports = (sequelize, DataTypes) => {
  const Intersections = sequelize.define('Intersections', {
    route_id: DataTypes.INTEGER,
    intersection_id: DataTypes.INTEGER
  }, {});
  Intersections.associate = function(models) {
    Intersections.belongsTo(models.Routes, {
        through: 'routes_id',
        as: 'routes',
        foreignKey: 'routes_id'
    })
  };
  return Intersections;
};