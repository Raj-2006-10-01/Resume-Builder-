import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Resumepreview from '../components/ResumePreview'
import Lodder from '../components/Lodder'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {

  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const [resumeData, setResumeData] = useState(null)

  const [error, setError] = useState('')

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`)
      setResumeData(data.resume)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    loadResume()
  }, [resumeId])


  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10 '>
        <Resumepreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_colour || resumeData.accent_color} classes='py-4 bg-white' />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Lodder /> : (
        <div className='flex flex-col items-center justify-center h-screen px-4 text-center'>
          <p className='text-center text-2xl sm:text-4xl text-slate-400 font-medium'>{error || 'Resume not found'}</p>
          <a href='/' className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center justify-center transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4' />Go to Home
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview