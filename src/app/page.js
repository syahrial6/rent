import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  const cars = [
    { id: 1, name: 'Fortuner', price: '1500000', image: '/image/fortuner.jpg', path: '/fortuner'},
    { id: 2, name: 'Hilux ', price: '1500000', image: '/image/hilux.jpg', path: '/hilux' },
    { id: 3, name: 'INNOVA REBORN', price: '500000', image: '/image/innova.jpg', path: '/innova' },
    { id: 4, name: 'AVANZA FACELIFT', price: '300000', image: '/image/facelift.jpg', path: '/facelift' },
    { id: 5, name: 'NEW AVANZA', price: '350000', image: '/image/newavanza.jpg', path: '/newavanza' },
    { id: 6, name: 'NEW VELOZ', price: '350000', image: '/image/veloz.jpg', path: '/veloz'},
    { id: 7, name: 'ALL NEW LIVINA', price: '350000', image: '/image/livina.jpg', path: '/livina'},
    // Tambahkan data mobil lainnya di sini
  ];
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Pilih Mobil</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image className="w-full" width={"300"} height={"200"} src={car.image} alt={car.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{car.name}</div>
              <p className="text-gray-700 text-base">Rp. {parseInt(car.price).toLocaleString()}</p>
             
                <Link href={car.path} className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Isi Form
                </Link>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
