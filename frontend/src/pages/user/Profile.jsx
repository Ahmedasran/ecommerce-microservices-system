import Navbar from "../../components/shared/Navbar";

function Profile() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <>

            <Navbar />

            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gradient-to-b
                from-gray-100
                to-gray-200
            ">

                <div className="
                    bg-white
                    p-10
                    rounded-3xl
                    shadow-2xl
                    w-[450px]
                    text-center
                ">

                    <div className="
                        w-28
                        h-28
                        rounded-full
                        bg-blue-500
                        text-white
                        flex
                        items-center
                        justify-center
                        text-5xl
                        font-bold
                        mx-auto
                        mb-6
                    ">

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <h1 className="
                        text-4xl
                        font-bold
                        mb-3
                    ">
                        {user?.name}
                    </h1>

                    <p className="
                        text-gray-500
                        text-lg
                    ">
                        {user?.email}
                    </p>

                </div>

            </div>

        </>
    );
}

export default Profile;