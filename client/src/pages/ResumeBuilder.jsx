import React, { use, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User, PersonalInfoFrom } from 'lucide-react'

const ResueBuilder = () => {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    exprience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_colour: '#3B82F6',
    public: false,
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }
  const [activeSectionindex, setActiveSectionindex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)


  const section = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "exprience", name: "Exprience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = section[activeSectionindex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  return (
    <div >
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4' />Back To Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/*left pannel-form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* {Progess bar using activeSectionindex} */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{ width: `${activeSectionindex * 100 / (section.length - 1)}%` }} />

              {/* Section navigation */}
              <div className='flex justify-between object-center mb-6 border-b border-gray-300 py-1'>
                <div></div>
                <div className='flex items-center'>
                  {activeSectionindex !== 0 && (
                    <button onClick={() => setActiveSectionindex((privIndex) => Math.max(privIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionindex === 0}>
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}

                  <button onClick={() => setActiveSectionindex((privIndex) => Math.min(privIndex = 1, section.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionindex === section.length - 1 && 'opacity-50'}`} disabled={activeSectionindex === section.length - 1}>
                    Next <ChevronRight className='size-4' />
                  </button>


                </div>
              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoFrom data={resumeData.personal_info} />
                )}
              </div>
            </div>
          </div>

          {/*right pannel-preview */}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default ResueBuilder