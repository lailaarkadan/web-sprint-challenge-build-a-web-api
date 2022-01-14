// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const router = express.Router();

const { validateProjectId, validateProject } = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get('/:id', validateProjectId ,(req, res) => {
    res.status(200).json(req.projects)
})


router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
})
router.put('/:id', validateProjectId, validateProject, (req, res) => {
    if (!req.body.completed) {
        res.status(400).json({
            message: "Missing field"
        })
    } else {
        Projects.update(req.params.id, req.body)
        .then(project => {
            res.json(project)
        })
    }
})
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(req.projects)
    }catch(err){
        next(err)
    }
})
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
        const action = await Projects.getProjectActions(req.params.id)
        res.json(action)
    }catch(err){
        next(err)
    }
})

module.exports = router

