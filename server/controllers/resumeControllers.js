import Resume from "../models/Resume.js";


//controller for creating  a new resume
//POST: /api/resume/create


export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        //create new resume

        const newResume = await Resume.create({ userid, title })

        //return success
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

//controller for delete a resume
//DELETE: /api/resume/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userid, _id: resumeId })


        //return success message
        return res.status(200).json({ message: 'Resume deleted successfully' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

//get user resume by id
//GET: /api/resume/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userid, _id: resumeId })

        if (!resume) {
            return req.status(400).json({ message: "Resume not found" })
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        //return success message
        return res.status(200).json({ resume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

//return resume data
//GET: /api/resume/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {
            return res.status(404).json({message:"Resume not found.."})
        }
        return res.status(200).json({resume})
    } catch (error) {
        
    return res.status(400).json({message:error.message})
} 
}

