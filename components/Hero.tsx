import Image from "next/image";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 place-items-center pt-16 pb-8">
      <div className="py-6 md:order-1">
        <Image
          alt="Hero image"
          className=" w-auto h-auto"
          src="/social-media-marketing.svg"
          width={800}
          height={500}
        />
      </div>
      <div>
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter">
          Genera <span className=" text-green-500">Bios</span> para tus redes
          sociales, CVs y mas
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          Aprovecha la nuevas herramientas como la IA para impulsar la creacion
          de contenido para tus redes sociales, CVs y mas, empieza ahora y haste
          notar.
        </p>
      </div>
    </div>
  );
};

export default Hero;
