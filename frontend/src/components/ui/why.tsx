import React, { useState } from 'react';

const Why = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionContent = [
    {
      title: "Fitur Deteksi Penyakit",
      description: "Deteksi penyakit dini adalah proses mengenali tanda-tanda awal suatu penyakit sebelum gejala menjadi lebih serius. Dengan menggunakan teknologi terbaru, platform kami memungkinkan pengguna untuk menjalani evaluasi risiko penyakit melalui kuesioner dan alat penilaian kesehatan. Ini sangat penting, karena banyak penyakit dapat diobati lebih efektif jika dideteksi pada tahap awal. Menurut World Health Organization (WHO), hampir 70% kematian akibat penyakit tidak menular di seluruh dunia dapat dicegah dengan intervensi awal yang tepat."
    },
    {
      title: "Rekomendasi Kesehatan Personal",
      description: "Setiap individu memiliki riwayat kesehatan yang unik. Oleh karena itu, sistem kami memberikan rekomendasi kesehatan yang disesuaikan berdasarkan data kesehatan dan gaya hidup pengguna. Misalnya, jika pengguna memiliki riwayat hipertensi, sistem akan merekomendasikan gaya hidup dan pola makan untuk dilakukan oleh pengguna. Penelitian menunjukkan bahwa intervensi kesehatan yang dipersonalisasi dapat meningkatkan kepatuhan pasien terhadap pengobatan dan program pencegahan."
    },
    {
      title: "Pusat Informasi Kesehatan",
      description: "Sebagai bagian dari upaya edukasi masyarakat, fitur ini memberikan akses ke berbagai informasi tentang penyakit, gejala, dan metode pencegahan. Pengguna dapat mencari tahu lebih lanjut tentang kondisi kesehatan tertentu, tips gaya hidup sehat, serta kebiasaan pencegahan. Hal ini sangat penting untuk meningkatkan kesadaran masyarakat tentang pentingnya kesehatan dan pencegahan penyakit."
    },
    {
      title: "Desain Responsif dan User-Friendly",
      description: "Dalam mendorong upaya mewujudkan Indonesia yang sehat, kami menghadirkan desain aplikasi yang user-friendly untuk meningkatkan minat masyarakat untuk aware terhadap kondisi kesehatan mereka. Kami akan memberikan tampilan yang dinamis dan dapat diakses melalui device apapun supaya memudahkan pengguna dalam mengecek kesehatan mereka."
    }
  ];

  return (
    <section id="why" className="md:px-32 px-8 py-28 flex flex-col items-center">
      <h1 className='md:text-[28px] text-2xl text-center font-[700] opacity-85 capitalize'>
        Mengapa Perlu Menggunakan Kami
      </h1>
      <p className='mb-6 mt-3 text-gray-500 text-sm md:text-[16px] text-center mx-6 md:max-w-5xl leading-6'>
        Kami menyediakan berbagai fitur untuk menunjang kesehatan Anda di masa depan. Dengan fitur deteksi penyakit, Anda akan mendapat rekomendasi berdasarkan kondisi kesehatan. Fitur yang kami hadirkan:
      </p>
      <div id="accordion-open" className="w-full md:mt-6 px-4 md:px-0">
        {accordionContent.map((item, index) => (
          <div key={index} className="w-full md:w-3/4 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg mb-2">
            <h2 id={`accordion-open-heading-${index + 1}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full md:p-5 p-4 border border-gray-200 rounded-lg focus:ring-0 hover:bg-blue-50 gap-3"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`accordion-open-body-${index + 1}`}
              >
                <span className="flex items-center md:text-base text-sm text-left font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fill="#3B82F6"
                      d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 472c-119.1 0-216-96.9-216-216S136.9 40 256 40s216 96.9 216 216-96.9 216-216 216zm100.7-299.3L233 295.4l-61.7-61.7c-7.8-7.8-20.5-7.8-28.3 0s-7.8 20.5 0 28.3l72 72c7.8 7.8 20.5 7.8 28.3 0l136-136c7.8-7.8 7.8-20.5 0-28.3s-20.5-7.8-28.3 0z"
                    />
                  </svg>
                  {item.title}
                </span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 shrink-0 ${openIndex === index ? "" : "rotate-180"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-open-body-${index + 1}`}
              className={`${openIndex === index ? "" : "hidden"}`}
              aria-labelledby={`accordion-open-heading-${index + 1}`}
            >
              <div className="p-5 border border-b-0 border-gray-200 font-thin md:text-sm text-xs rounded-lg bg-white text-black/70">
                <p className="mb-2 leading-5 md:leading-[2]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Why;
