/**
 *
 * Created by tech4GT on 8/25/17.
 */
const models = require('/backend/db/models')
module.exports = {

    newBatch : function (name, startDate,endDate,size,courseId,centerId,done) {
      models.batches.findOne({
          name : name,
          startDate : JSON.parse(startDate),
          endDate : JSON.parse(endDate),
          size : size,
          courseId : courseId,
          centerId : centerId
      }).then(function (data) {
          done(data)
      }).catch(function (err) {
          if(err) throw err
      });
    }

}