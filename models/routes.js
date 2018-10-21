'use strict';
module.exports = (sequelize, DataTypes) => {
  const Routes = sequelize.define('Routes', {
    route_id: DataTypes.INTEGER
  }, {});
  Routes.associate = function(models) {
    Routes.hasMany(models.Intersections, {
        foreignKey: 'route_id',
        as: 'routes',
      });
  };
  return Routes;
};