import React from 'react'
import HeroVideoDialog from './hero-video-dialog'

const Demo = () => {
  return (
    <section id='demo' className='md:px-32 px-8 py-28 flex flex-col text-primary items-center'>
      <h1 className='capitalize md:text-3xl text-2xl text-center font-[700] opacity-85 text-primary'>cek kesehatan anda</h1>
      <p className='mb-6 mt-3 text-gray-500 text-md md:text-[18px] text-center'>Lihat tutorialnya dan cek kesehatanmu sekarang juga!</p>

      <HeroVideoDialog videoSrc='' thumbnailSrc='' />
    </section>
  )
}

export default Demo