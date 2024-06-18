"use client";
import { useState ,useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import swal from "sweetalert";

export default function Fortuner({ params }) {

    const carPrices = {
        fortuner: 1500000,
        hilux: 1500000,
        newavanza: 350000,
        facelift: 300000,
        veloz: 350000,
        innova: 500000,
        livina: 350000,
        brio: 300000,
        // Tambahkan jenis mobil dan harga lainnya di sini
      };
      
      const getCarPrice = (idCar) => {
        return carPrices[idCar]; // Jika idCar tidak ditemukan, default harga adalah 500000
      };
      const harga = getCarPrice(params.idCar);
    
  const [formData, setFormData] = useState({
    waktuKeluar: "",
    namaPenyewa: "",
    unit: "",
    opsi: "",
    durasi: "",
    tujuan: "",
    harga: "",
    tujuanAntar: "",
    timAntar: "",
  });
  console.log(formData);
  useEffect(() => {
    // Kalkulasi harga berdasarkan durasi
    if (formData.durasi) {
      setFormData(prevFormData => ({
        ...prevFormData,
        harga: harga * formData.durasi
      }));
    }
  }, [formData.durasi]);
 
  const [loading,setLoading] = useState(false);
  const varianMobil = [
    {
      mobil: "Fortuner GR - 1880 DJ",
      harga: "1500000",
      key: "fortuner",
    },
    {
      mobil: "Hilux DC 4x4 - 8192 VB",
      harga: "1500000",
      key: "hilux",
    },
    {
      mobil: "INNOVA REBORN V - 1573 DY",
      harga: "500000",
      key: "innova",
    },
    {
      mobil: "INNOVA REBORN Q - 2302 SYI",
      harga: "500.000",
      key: "innova",
    },
    {
      mobil: "ALL NEW LIVINA - 1487 DG",
      harga: "350.000",
      key: "livina",
    },
    {
      mobil: "NEW VELOZ - 1174 SY",
      harga: "350.000",
      key: "veloz",
    },
    {
      mobil: "NEW AVANZA AT - 1973 QZ",
      harga: "350.000",
      key: "newavanza",
    },
    {
      mobil: "NEW AVANZA MT - 1931 WY",
      harga: "350.000",
      key: "newavanza",
    },
    {
      mobil: "AVANZA FACELIFT - 1005 DI",
      harga: "300.000",
      key: "facelift",
    },
    {
      mobil: "AVANZA FACELIFT - 1295 WU",
      harga: "300.000",
      key: "facelift",
    },
    {
      mobil: "AVANZA FACELIFT - 1395 WV",
      harga: "300.000",
      key: "facelift",
    },
    {
      mobil: "BRIO RS CVT - 1746 SM",
      harga: "300.000",
      key: "brio",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwWyygUupIKE-QfRXBaxtnSIiahPh2A2shIi8xnLrixeJpbgDLUEmSWWeLY2ijKYuxq/exec";

    try {
      setLoading(true);
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataObj.append(key, formData[key])
      );

      const response = await axios.post(scriptURL, formDataObj);

      if (response.status === 200) {
       
        console.log("Success!", response);
        swal("Good job!", "Data Telah Disimpan", "success");
      } else {
      
        console.error("Error!", response.statusText);
        swal("Error!", `${response.statusText}`, "error");
      }
      setLoading(false);
    } catch (error) {
      
      console.error("Error!", error.message);
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
     
      <h2 className="text-2xl font-bold mb-4">Form Penggunaan Mobil</h2>
      <Image
        src={`/image/${params.idCar}.jpg`}
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal</label>
          <input
          required={true}
            type="datetime-local"
            name="waktuKeluar"
            value={formData.waktuKeluarKeluar}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Penyewa</label>
          <input
           required={true}
            type="text"
            name="namaPenyewa"
            value={formData.namaPenyewa}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pilih Mobil</label>
          <select
           required={true}
            name="unit"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Pilih Mobil</option>
            {varianMobil.map((item, index) => (
              <option key={index} disabled={item.key !== params.idCar} value={item.mobil}>
                {item.mobil}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tujuan</label>
          <input
           required={true}
            type="text"
            name="tujuan"
            value={formData.tujuan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Opsi</label>
          <select name="opsi" value={formData.opsi}
          onChange={handleChange} required={true} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"> 
            <option value="">Pilih Opsi</option>
            <option value="Kaki">Kaki</option>
            <option value="Konsumen">Konsumen</option>
          </select>
         
          
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Durasi</label>
          <input
           required={true}
            name="durasi"
            value={formData.durasi}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tim Antar</label>
          <input
            type="text"
            name="timAntar"
            value={formData.timAntar}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      
        <div className="mb-4">
          <label className="block text-gray-700">Tujuan Antar</label>
          <input
           required={true}
            name="tujuanAntar"
            value={formData.tujuanAntar}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <label className="block text-gray-700">Harga</label>
        <label className="block text-gray-700" name="harga" onChange={handleChange}>{harga*formData.durasi}</label>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 px-4 hover:bg-indigo-600"
          >
            {loading === true ? "Loading..." :  "Submit"}
           
          </button>
        </div>
      </form>
    </div>
  );
}
