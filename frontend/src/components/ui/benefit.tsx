import React from 'react';
import { MagicCard } from './magic-card';

const Benefit = () => {
  const cardContent = [
    {
      d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
      text: "Cegah penyakit berkembang lebih parah.",
      additionalText: "Dengan langkah pencegahan yang tepat, kita bisa mencegah berbagai penyakit berat dan menjaga kesehatan tubuh secara keseluruhan.",
    },
    {
      d: "M13 2L3 14h9l-2 8 10-12h-9z",
      text: "Penanganan lebih awal, hasil lebih baik.",
      additionalText: "Tindakan cepat dapat meningkatkan peluang pemulihan, mencegah komplikasi lebih lanjut, dan mengurangi resiko kematian.",
    },
    {
      d: "M8 8h8m-8 4h8m-8 4h8M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z",
      text: "Lebih hemat biaya pengobatan.",
      additionalText: "Investasi dalam pencegahan dan deteksi dini dapat mengurangi pengeluaran untuk perawatan yang lebih mahal di kemudian hari.",
    },
  ];

  return (
    <section id="benefit" className="md:px-32 px-8 pb-16 md:py-28 flex flex-col items-center">
      <h1 className='md:text-3xl text-2xl text-center font-[700] opacity-85 capitalize'>Pentingnya Antisipasi</h1>
      <p className='mb-6 mt-3 text-gray-500 text-md md:text-[18px] text-center'>Mengapa kita perlu melakukan antisipasi untuk segala jenis penyakit?</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl min-h-[350px] mx-6'>
        {cardContent.map((item, index) => (
          <MagicCard
            key={index}
            gradientColor="#3B82F6"
            gradientOpacity={0.2}
            className="bg-white/70 border border-slate-300 p-6 flex flex-col justify-end hover:scale-110 hover:z-10"
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <svg
                className="w-12 h-12 mb-2 p-2 rounded border border-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="#3B82F6"
                fill="transparent"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d} />
              </svg>
              <div className='flex flex-col gap-1'>
                <p className="text-[17px] font-normal">{item.text}</p>
                <p className="text-[14px] font-[200] text-black/70">{item.additionalText}</p>
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
    </section>
  );
};

export default Benefit;
