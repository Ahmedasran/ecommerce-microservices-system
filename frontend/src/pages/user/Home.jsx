import Navbar from "../../components/shared/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const scrollToFeatures = () => {

    const section = document.getElementById("features");

    section?.scrollIntoView({
      behavior: "smooth"
    });

  };

  return (

    <>

      <Navbar />

      <div className="bg-gray-100 min-h-screen">

        {/* HERO SECTION */}

        <section className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          h-[90vh]
          px-6
          bg-gradient-to-r
          from-black
          to-gray-800
          text-white
        ">

          <h1 className="text-6xl font-bold mb-6">
            Microservices Store
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl leading-9">
            Powerful E-Commerce System built using React,
            Spring Boot, Apache Kafka, Docker,
            MongoDB, and MySQL.
          </p>


          {/* BUTTONS */}

          <div className="flex gap-4 mt-8">

            <button
              onClick={() => navigate("/products")}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-8
                py-3
                rounded-xl
                text-lg
                font-semibold
                transition
                duration-300
              "
            >
              View Products
            </button>


            <button
              onClick={scrollToFeatures}
              className="
                border
                border-white
                hover:bg-white
                hover:text-black
                px-8
                py-3
                rounded-xl
                text-lg
                font-semibold
                transition
                duration-300
              "
            >
              Learn More
            </button>

          </div>

        </section>


        {/* FEATURES SECTION */}

        <section
          id="features"
          className="py-20 px-10"
        >

          <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
            Project Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="
              bg-white
              shadow-lg
              rounded-2xl
              p-8
              hover:scale-105
              transition
              duration-300
            ">

              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Kafka Messaging
              </h3>

              <p className="text-gray-600 leading-7">
                Services communicate asynchronously using Apache Kafka
                for high scalability and event-driven architecture.
              </p>

            </div>


            <div className="
              bg-white
              shadow-lg
              rounded-2xl
              p-8
              hover:scale-105
              transition
              duration-300
            ">

              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Dockerized Services
              </h3>

              <p className="text-gray-600 leading-7">
                Every microservice runs independently inside Docker
                containers with full docker-compose integration.
              </p>

            </div>


            <div className="
              bg-white
              shadow-lg
              rounded-2xl
              p-8
              hover:scale-105
              transition
              duration-300
            ">

              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                Modern Frontend
              </h3>

              <p className="text-gray-600 leading-7">
                Responsive React frontend built with Tailwind CSS
                for a clean and modern user experience.
              </p>

            </div>

          </div>

        </section>


        {/* TECHNOLOGIES */}

        <section className="py-20 bg-black text-white px-10">

          <h2 className="text-4xl font-bold text-center mb-14">
            Technologies Used
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div className="
              bg-gray-900
              p-6
              rounded-2xl
              shadow-lg
              hover:bg-gray-800
              transition
            ">

              <h3 className="text-2xl font-semibold">
                React
              </h3>

            </div>


            <div className="
              bg-gray-900
              p-6
              rounded-2xl
              shadow-lg
              hover:bg-gray-800
              transition
            ">

              <h3 className="text-2xl font-semibold">
                Spring Boot
              </h3>

            </div>


            <div className="
              bg-gray-900
              p-6
              rounded-2xl
              shadow-lg
              hover:bg-gray-800
              transition
            ">

              <h3 className="text-2xl font-semibold">
                Kafka
              </h3>

            </div>


            <div className="
              bg-gray-900
              p-6
              rounded-2xl
              shadow-lg
              hover:bg-gray-800
              transition
            ">

              <h3 className="text-2xl font-semibold">
                Docker
              </h3>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="
          bg-gray-900
          text-gray-300
          text-center
          py-6
        ">

          <p>
            Built by Ahmed Asran using Microservices Architecture 🚀
          </p>

        </footer>

      </div>

    </>
  );
}

export default Home;