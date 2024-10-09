import React from "react";
import NumberTicker from "./number-ticker";

const Case = () => {
  const caseContent = [
    {
      number: "%",
      tick: 70,
      caption:
        "Kematian akibat penyakit tidak menular di seluruh dunia dapat dicegah dengan intervensi awal yang tepat.",
      source: "WHO",
    },
    {
      number: "ribu",
      tick: 370,
      caption:
        "Kasus kematian akibat penyakit kardiovaskular (jantung) yang menjadi penyebab angka kematian terbesar di Indonesia.",
      source: "antaranews.com",
    },
    {
      number: "%",
      tick: 80,
      caption:
        "Jumlah kasus kematian yang dapat dicegah dengan langkah-langkah pencegahan, seperti pengendalian faktor risiko dan deteksi dini.",
      source: "Kemenkes",
    },
  ];
  return (
    <section id="case" className="bg-[#ecf3fe] text-primary mx-16 rounded-xl shadow">
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex lg:h-fit items-center">
        <div className="mx-auto max-w-6xl text-center flex flex-col lg:flex-row gap-10 lg:gap-12">
          {caseContent.map((item, index) => (  
          <div key={index} className="flex flex-col gap-4 justify-center items-center flex-1">
            <h1 className="text-4xl text-transparent font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
              <NumberTicker
                value={item.tick}
                delay={0}
                decimalPlaces={0}
                className="text-transparent font-bold bg-gradient-to-br from-blue-300 via-blue-500 to-purple-600 bg-clip-text"
              />{" "}
              {item.number}
            </h1>
            <p className="text-md md:text-lg">
              {item.caption}
            </p>
            <p className="text-xs font-thin -mt-2 text-gray-500">
              {item.source}
            </p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Case;
