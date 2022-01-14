// add middlewares here related to actions
const Actions = require('./actions-model')
async function validateActionId(req, res, next) {
    try{
        const ActionId = await Actions.get(req.params.id)
        if(!ActionId) {
            req.projects = ActionId
            next()
        } else {
            next({ status: 404, message: 'action not found' })
        }
    }catch (err) {
        next(err)
    }
}

const validateAction = (req, res, next) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes){
      res.status(400).json({ message: "missing requirements" })
    }else{
      next()
    }
    
  }

module.exports = {
    validateActionId,
    validateAction
   
}