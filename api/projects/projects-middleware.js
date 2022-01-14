// add middlewares here related to projects

const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try{
        const projectId = await Projects.get(req.params.id)
        if(projectId) {
            req.projects = projectId
            next()
        } else {
            next({ status: 404, message: 'project not found' })
        }
    }catch (err) {
        next(err)
    }
}

const validateProject = (req, res, next) => {
    if(!req.body.name || !req.body.description || !req.body.description){
      res.status(400).json({ message: "missing requirements" })
    }else{
      next()
    }
    
  }



module.exports = {
    validateProjectId,
    validateProject
}









