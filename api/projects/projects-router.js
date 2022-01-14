// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const { 
    validateProjectId, validateProject
} = require('./projects-middleware')
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch({ message: "error retrieving projects" });
});

router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', validateProject, async (req, res, next) => {
	try {
		await Projects.insert(req.body).then(newProject => {
			res.status(201).json(newProject)
		})
	} catch (err) {
		next(err)
	}
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

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(res.status(200).json({message: "Deleted"}))
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











