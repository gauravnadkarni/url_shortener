'use strict';
module.exports = (sequelize, DataTypes) => {
  const LongUrl = sequelize.define('Long_Url', {
    shortCode: DataTypes.STRING,
    longUrl: DataTypes.STRING,
  }, {});
  LongUrl.associate = function (models) {
    LongUrl.belongsTo(models.ShortCode, { foreignKey: 'shortCode', as: 'shortCode', sourceKey: 'shortCode' });
  };
  LongUrl.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return LongUrl;
};